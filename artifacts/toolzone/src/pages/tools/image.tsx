import { useState, useEffect, useCallback, useRef } from "react";
import { ToolPageLayout } from "@/components/Layout/ToolPageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Download, Copy, RefreshCw } from "lucide-react";

function DropZone({ onFile }: { onFile: (file: File) => void }) {
  return (
    <label className="border-2 border-dashed border-white/20 rounded-xl p-10 text-center cursor-pointer hover:border-primary/50 transition-colors block">
      <input type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && onFile(e.target.files[0])} />
      <div className="text-4xl mb-3">🖼️</div>
      <p className="text-muted-foreground">Drop image here or click to upload</p>
      <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WebP, GIF</p>
    </label>
  );
}

// ──────────────────────────────────────────────
// ImageCompressor
// ──────────────────────────────────────────────
function ImageCompressor() {
  const [origUrl, setOrigUrl] = useState<string | null>(null);
  const [origSize, setOrigSize] = useState(0);
  const [quality, setQuality] = useState(0.7);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleFile = (file: File) => {
    setOrigSize(file.size);
    setCompressedUrl(null);
    const reader = new FileReader();
    reader.onload = e => setOrigUrl(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleCompress = () => {
    if (!origUrl) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(blob => {
        if (!blob) return;
        setCompressedSize(blob.size);
        const url = URL.createObjectURL(blob);
        setCompressedUrl(url);
      }, "image/jpeg", quality);
    };
    img.src = origUrl;
  };

  const handleDownload = () => {
    if (!compressedUrl) return;
    const a = document.createElement("a");
    a.href = compressedUrl;
    a.download = "compressed.jpg";
    a.click();
  };

  return (
    <div className="space-y-6">
      <DropZone onFile={handleFile} />

      {origUrl && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Quality: {Math.round(quality * 100)}%</Label>
            <Slider
              min={10} max={100} step={5}
              value={[Math.round(quality * 100)]}
              onValueChange={([v]) => setQuality(v / 100)}
            />
          </div>
          <Button className="primary-gradient w-full" onClick={handleCompress}>
            <RefreshCw className="w-4 h-4 mr-2" /> Compress Image
          </Button>
        </div>
      )}

      {origUrl && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-black/30 border border-white/5 rounded-xl p-4 text-center space-y-2">
            <p className="text-sm text-muted-foreground font-medium">Original</p>
            <img ref={imgRef} src={origUrl} alt="original" className="max-w-full max-h-48 object-contain mx-auto rounded" />
            <p className="font-mono text-sm">{(origSize / 1024).toFixed(1)} KB</p>
          </div>
          <div className="bg-black/30 border border-white/5 rounded-xl p-4 text-center space-y-2">
            <p className="text-sm text-muted-foreground font-medium">Compressed</p>
            {compressedUrl ? (
              <>
                <img src={compressedUrl} alt="compressed" className="max-w-full max-h-48 object-contain mx-auto rounded" />
                <p className="font-mono text-sm">{(compressedSize / 1024).toFixed(1)} KB
                  <span className="text-green-400 ml-2">
                    ({Math.round((1 - compressedSize / origSize) * 100)}% smaller)
                  </span>
                </p>
                <Button variant="secondary" size="sm" onClick={handleDownload}>
                  <Download className="w-4 h-4 mr-2" /> Download
                </Button>
              </>
            ) : (
              <p className="text-muted-foreground text-sm mt-8">Press compress to see result</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────
// ImageResizer
// ──────────────────────────────────────────────
function ImageResizer() {
  const [origUrl, setOrigUrl] = useState<string | null>(null);
  const [origW, setOrigW] = useState(0);
  const [origH, setOrigH] = useState(0);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [lockAspect, setLockAspect] = useState(true);
  const [resizedUrl, setResizedUrl] = useState<string | null>(null);
  const [resizedDims, setResizedDims] = useState({ w: 0, h: 0 });

  const handleFile = (file: File) => {
    setResizedUrl(null);
    const reader = new FileReader();
    reader.onload = e => {
      const url = e.target?.result as string;
      setOrigUrl(url);
      const img = new Image();
      img.onload = () => {
        setOrigW(img.naturalWidth);
        setOrigH(img.naturalHeight);
        setWidth(String(img.naturalWidth));
        setHeight(String(img.naturalHeight));
      };
      img.src = url;
    };
    reader.readAsDataURL(file);
  };

  const onWidthChange = (v: string) => {
    setWidth(v);
    if (lockAspect && origW && origH) {
      const ratio = origH / origW;
      setHeight(String(Math.round(Number(v) * ratio)));
    }
  };

  const onHeightChange = (v: string) => {
    setHeight(v);
    if (lockAspect && origW && origH) {
      const ratio = origW / origH;
      setWidth(String(Math.round(Number(v) * ratio)));
    }
  };

  const handleResize = () => {
    if (!origUrl) return;
    const w = parseInt(width, 10);
    const h = parseInt(height, 10);
    if (!w || !h) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, w, h);
      setResizedUrl(canvas.toDataURL("image/png"));
      setResizedDims({ w, h });
    };
    img.src = origUrl;
  };

  const handleDownload = () => {
    if (!resizedUrl) return;
    const a = document.createElement("a");
    a.href = resizedUrl;
    a.download = "resized.png";
    a.click();
  };

  return (
    <div className="space-y-6">
      <DropZone onFile={handleFile} />

      {origUrl && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Original dimensions: <span className="font-mono text-primary">{origW} × {origH}px</span>
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Width (px)</Label>
              <Input className="font-mono" value={width} onChange={e => onWidthChange(e.target.value)} type="number" min={1} />
            </div>
            <div className="space-y-1">
              <Label>Height (px)</Label>
              <Input className="font-mono" value={height} onChange={e => onHeightChange(e.target.value)} type="number" min={1} />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Switch id="lock-aspect" checked={lockAspect} onCheckedChange={setLockAspect} />
            <Label htmlFor="lock-aspect">Lock aspect ratio</Label>
          </div>
          <Button className="primary-gradient w-full" onClick={handleResize}>Resize Image</Button>
        </div>
      )}

      {resizedUrl && (
        <div className="bg-black/30 border border-white/5 rounded-xl p-6 text-center space-y-3">
          <img src={resizedUrl} alt="resized" className="max-w-full max-h-64 object-contain mx-auto rounded" />
          <p className="font-mono text-sm text-muted-foreground">
            {resizedDims.w} × {resizedDims.h}px
          </p>
          <Button variant="secondary" onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" /> Download PNG
          </Button>
        </div>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────
// ImageToBase64
// ──────────────────────────────────────────────
function ImageToBase64() {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState(0);
  const [fileName, setFileName] = useState("");

  const handleFile = (file: File) => {
    setFileSize(file.size);
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = e => setDataUrl(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const base64Only = dataUrl ? dataUrl.split(",")[1] : "";
  const header = dataUrl ? dataUrl.split(",")[0] + "," : "";

  const copyDataUrl = () => {
    if (!dataUrl) return;
    navigator.clipboard.writeText(dataUrl);
    toast.success("Copied!");
  };

  const copyBase64 = () => {
    if (!base64Only) return;
    navigator.clipboard.writeText(base64Only);
    toast.success("Copied!");
  };

  return (
    <div className="space-y-6">
      <DropZone onFile={handleFile} />

      {dataUrl && (
        <div className="space-y-4">
          <div className="bg-black/30 border border-white/5 rounded-xl p-4 space-y-2">
            <p className="text-sm text-muted-foreground">
              File: <span className="text-primary">{fileName}</span> —{" "}
              <span className="font-mono">{(fileSize / 1024).toFixed(1)} KB</span>
            </p>
            <p className="text-xs font-mono text-muted-foreground break-all">{header}</p>
          </div>

          <div className="space-y-2">
            <Label>Base64 Data URL</Label>
            <Textarea
              readOnly
              value={dataUrl}
              className="font-mono text-xs h-40 resize-none bg-black/40 border-white/10"
            />
          </div>

          <div className="flex gap-3">
            <Button className="primary-gradient flex-1" onClick={copyDataUrl}>
              <Copy className="w-4 h-4 mr-2" /> Copy Full Data URL
            </Button>
            <Button variant="secondary" className="flex-1" onClick={copyBase64}>
              <Copy className="w-4 h-4 mr-2" /> Copy Base64 Only
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────
// Base64ToImage
// ──────────────────────────────────────────────
function Base64ToImage() {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [error, setError] = useState("");

  const handleLoad = () => {
    setError("");
    let url = input.trim();
    if (!url.startsWith("data:")) {
      url = "data:image/png;base64," + url;
    }
    const img = new Image();
    img.onload = () => {
      setImageUrl(url);
      setDims({ w: img.naturalWidth, h: img.naturalHeight });
    };
    img.onerror = () => setError("Invalid base64 or image data.");
    img.src = url;
  };

  const handleDownload = () => {
    if (!imageUrl) return;
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = "image.png";
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Paste Base64 or Data URL</Label>
        <Textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="data:image/png;base64,iVBORw0KGgo... or just the base64 string"
          className="font-mono text-xs h-40 resize-none bg-black/40 border-white/10"
        />
      </div>
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <Button className="primary-gradient w-full" onClick={handleLoad}>Load Image</Button>

      {imageUrl && (
        <div className="bg-black/30 border border-white/5 rounded-xl p-6 text-center space-y-3">
          <img src={imageUrl} alt="decoded" className="max-w-full max-h-64 object-contain mx-auto rounded" />
          <p className="font-mono text-sm text-muted-foreground">{dims.w} × {dims.h}px</p>
          <Button variant="secondary" onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" /> Download
          </Button>
        </div>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────
// ImageColorPicker
// ──────────────────────────────────────────────
function ImageColorPicker() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [pickedColor, setPickedColor] = useState<{ hex: string; r: number; g: number; b: number } | null>(null);
  const [history, setHistory] = useState<{ hex: string; r: number; g: number; b: number }[]>([]);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        imgRef.current = img;
        const canvas = canvasRef.current!;
        const maxW = 500;
        const scale = img.naturalWidth > maxW ? maxW / img.naturalWidth : 1;
        canvas.width = Math.round(img.naturalWidth * scale);
        canvas.height = Math.round(img.naturalHeight * scale);
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        setLoaded(true);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);
    const ctx = canvas.getContext("2d")!;
    const [r, g, b] = ctx.getImageData(x, y, 1, 1).data;
    const hex = "#" + [r, g, b].map(v => v.toString(16).padStart(2, "0")).join("");
    const color = { hex, r, g, b };
    setPickedColor(color);
    setHistory(prev => [color, ...prev].slice(0, 8));
  };

  return (
    <div className="space-y-6">
      <DropZone onFile={handleFile} />

      {loaded && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Click anywhere on the image to pick a color</p>
          <canvas
            ref={canvasRef}
            onClick={handleCanvasClick}
            className="rounded-xl border border-white/10 cursor-crosshair max-w-full"
            style={{ display: "block" }}
          />
        </div>
      )}

      {!loaded && <canvas ref={canvasRef} className="hidden" />}

      {pickedColor && (
        <div className="bg-black/30 border border-white/5 rounded-xl p-6 flex items-center gap-6">
          <div
            className="w-16 h-16 rounded-xl border border-white/10 flex-shrink-0"
            style={{ background: pickedColor.hex }}
          />
          <div className="space-y-1">
            <p className="font-mono text-lg text-primary">{pickedColor.hex.toUpperCase()}</p>
            <p className="font-mono text-sm text-muted-foreground">
              rgb({pickedColor.r}, {pickedColor.g}, {pickedColor.b})
            </p>
            <Button variant="secondary" size="sm" onClick={() => { navigator.clipboard.writeText(pickedColor.hex); toast.success("Copied!"); }}>
              <Copy className="w-3 h-3 mr-1" /> Copy HEX
            </Button>
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Color History</p>
          <div className="flex flex-wrap gap-3">
            {history.map((c, i) => (
              <button
                key={i}
                onClick={() => { navigator.clipboard.writeText(c.hex); toast.success("Copied!"); }}
                title={c.hex}
                className="flex flex-col items-center gap-1 group"
              >
                <div
                  className="w-10 h-10 rounded-lg border border-white/10 group-hover:border-primary/50 transition-colors"
                  style={{ background: c.hex }}
                />
                <span className="font-mono text-xs text-muted-foreground">{c.hex.toUpperCase()}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────
// GrayscaleConverter
// ──────────────────────────────────────────────
function GrayscaleConverter() {
  const origCanvasRef = useRef<HTMLCanvasElement>(null);
  const grayCanvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [converted, setConverted] = useState(false);

  const handleFile = (file: File) => {
    setConverted(false);
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        const canvas = origCanvasRef.current!;
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        canvas.getContext("2d")!.drawImage(img, 0, 0);
        setLoaded(true);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleConvert = () => {
    const orig = origCanvasRef.current!;
    const gray = grayCanvasRef.current!;
    gray.width = orig.width;
    gray.height = orig.height;
    const ctx = gray.getContext("2d")!;
    ctx.drawImage(orig, 0, 0);
    const imageData = ctx.getImageData(0, 0, gray.width, gray.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const avg = Math.round(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
      data[i] = avg;
      data[i + 1] = avg;
      data[i + 2] = avg;
    }
    ctx.putImageData(imageData, 0, 0);
    setConverted(true);
  };

  const handleDownload = () => {
    const canvas = grayCanvasRef.current!;
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = "grayscale.png";
    a.click();
  };

  return (
    <div className="space-y-6">
      <DropZone onFile={handleFile} />

      {loaded && (
        <Button className="primary-gradient w-full" onClick={handleConvert}>
          Convert to Grayscale
        </Button>
      )}

      <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${!loaded ? "hidden" : ""}`}>
        <div className="bg-black/30 border border-white/5 rounded-xl p-4 text-center space-y-2">
          <p className="text-sm text-muted-foreground">Original</p>
          <canvas ref={origCanvasRef} className="max-w-full max-h-48 object-contain mx-auto rounded" style={{ display: loaded ? "block" : "none" }} />
        </div>
        <div className="bg-black/30 border border-white/5 rounded-xl p-4 text-center space-y-2">
          <p className="text-sm text-muted-foreground">Grayscale</p>
          <canvas ref={grayCanvasRef} className="max-w-full max-h-48 object-contain mx-auto rounded" style={{ display: converted ? "block" : "none" }} />
          {!converted && <p className="text-muted-foreground text-sm mt-8">Press convert to see result</p>}
          {converted && (
            <Button variant="secondary" size="sm" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" /> Download PNG
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// ImageFlipper
// ──────────────────────────────────────────────
function ImageFlipper() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);
  const stateRef = useRef<HTMLCanvasElement | null>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        const offscreen = document.createElement("canvas");
        offscreen.width = img.naturalWidth;
        offscreen.height = img.naturalHeight;
        offscreen.getContext("2d")!.drawImage(img, 0, 0);
        stateRef.current = offscreen;

        const canvas = canvasRef.current!;
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        canvas.getContext("2d")!.drawImage(img, 0, 0);
        setLoaded(true);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const applyTransform = (type: "flipH" | "flipV" | "rotateCW" | "rotateCCW") => {
    const src = stateRef.current!;
    const sw = src.width;
    const sh = src.height;
    const offscreen = document.createElement("canvas");

    if (type === "rotateCW" || type === "rotateCCW") {
      offscreen.width = sh;
      offscreen.height = sw;
    } else {
      offscreen.width = sw;
      offscreen.height = sh;
    }

    const ctx = offscreen.getContext("2d")!;

    if (type === "flipH") {
      ctx.translate(sw, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(src, 0, 0);
    } else if (type === "flipV") {
      ctx.translate(0, sh);
      ctx.scale(1, -1);
      ctx.drawImage(src, 0, 0);
    } else if (type === "rotateCW") {
      ctx.translate(sh, 0);
      ctx.rotate(Math.PI / 2);
      ctx.drawImage(src, 0, 0);
    } else if (type === "rotateCCW") {
      ctx.translate(0, sw);
      ctx.rotate(-Math.PI / 2);
      ctx.drawImage(src, 0, 0);
    }

    stateRef.current = offscreen;

    const canvas = canvasRef.current!;
    canvas.width = offscreen.width;
    canvas.height = offscreen.height;
    canvas.getContext("2d")!.drawImage(offscreen, 0, 0);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current!;
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = "flipped.png";
    a.click();
  };

  return (
    <div className="space-y-6">
      <DropZone onFile={handleFile} />

      {loaded && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="secondary" onClick={() => applyTransform("flipH")}>↔ Flip Horizontal</Button>
            <Button variant="secondary" onClick={() => applyTransform("flipV")}>↕ Flip Vertical</Button>
            <Button variant="secondary" onClick={() => applyTransform("rotateCW")}>↻ Rotate 90° CW</Button>
            <Button variant="secondary" onClick={() => applyTransform("rotateCCW")}>↺ Rotate 90° CCW</Button>
          </div>

          <div className="bg-black/30 border border-white/5 rounded-xl p-6 text-center space-y-3">
            <canvas ref={canvasRef} className="max-w-full max-h-64 object-contain mx-auto rounded" />
            <Button variant="secondary" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" /> Download PNG
            </Button>
          </div>
        </div>
      )}

      {!loaded && <canvas ref={canvasRef} className="hidden" />}
    </div>
  );
}

// ──────────────────────────────────────────────
// Export
// ──────────────────────────────────────────────
export default function ImageTools({ active }: { active: string }) {
  return (
    <ToolPageLayout toolId={active}>
      {active === "image-compressor" && <ImageCompressor />}
      {active === "image-resizer" && <ImageResizer />}
      {active === "image-to-base64" && <ImageToBase64 />}
      {active === "base64-to-image" && <Base64ToImage />}
      {active === "image-color-picker" && <ImageColorPicker />}
      {active === "grayscale-converter" && <GrayscaleConverter />}
      {active === "image-flipper" && <ImageFlipper />}
    </ToolPageLayout>
  );
}
