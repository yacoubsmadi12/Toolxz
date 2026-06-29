import { useState, useRef, useEffect } from "react";
import { ToolPageLayout } from "@/components/Layout/ToolPageLayout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Download, Upload } from "lucide-react";

// Qr Generator using external library dynamically loaded
function QrGenerator() {
  const [text, setText] = useState("https://toolzone.app");
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Load QRCode library
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js";
    script.async = true;
    script.onload = () => generateQR();
    document.body.appendChild(script);

    return () => { document.body.removeChild(script); };
  }, []);

  const generateQR = () => {
    if (!text || !canvasRef.current || !(window as any).QRCode) return;
    
    (window as any).QRCode.toCanvas(canvasRef.current, text, {
      width: size,
      margin: 2,
      color: {
        dark: fgColor,
        light: bgColor
      }
    }, function (error: any) {
      if (error) console.error(error);
    });
  };

  useEffect(() => {
    if ((window as any).QRCode) {
      generateQR();
    }
  }, [text, size, fgColor, bgColor]);

  const download = () => {
    if(!canvasRef.current) return;
    const url = canvasRef.current.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "qrcode.png";
    a.click();
    toast.success("QR Code downloaded!");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <Label>Content (Text or URL)</Label>
          <Textarea 
            value={text} 
            onChange={e => setText(e.target.value)} 
            placeholder="Enter text or URL..."
            className="mt-2 bg-black/40"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Size (px)</Label>
            <Input 
              type="number" 
              value={size} 
              onChange={e => setSize(parseInt(e.target.value) || 256)} 
              className="mt-2 bg-black/40"
            />
          </div>
          <div></div>
          
          <div>
            <Label>Foreground Color</Label>
            <div className="flex mt-2 gap-2">
              <Input type="color" value={fgColor} onChange={e => setFgColor(e.target.value)} className="w-12 p-1 h-10 bg-black/40 cursor-pointer" />
              <Input type="text" value={fgColor} onChange={e => setFgColor(e.target.value)} className="bg-black/40 font-mono" />
            </div>
          </div>
          <div>
            <Label>Background Color</Label>
            <div className="flex mt-2 gap-2">
              <Input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-12 p-1 h-10 bg-black/40 cursor-pointer" />
              <Input type="text" value={bgColor} onChange={e => setBgColor(e.target.value)} className="bg-black/40 font-mono" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col items-center justify-center bg-card/30 p-8 rounded-xl border border-white/5 relative">
        <div className="bg-white p-4 rounded-xl shadow-xl">
          <canvas ref={canvasRef} className="max-w-full rounded" />
        </div>
        <Button onClick={download} className="mt-8 primary-gradient w-full max-w-[256px]">
          <Download className="w-4 h-4 mr-2" /> Download PNG
        </Button>
      </div>
    </div>
  );
}

function QrReader() {
  const [result, setResult] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      URL.revokeObjectURL(url);
      const canvas = canvasRef.current;
      if (!canvas || !(window as any).jsQR) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Draw image to canvas to get pixel data
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = (window as any).jsQR(imageData.data, imageData.width, imageData.height);
      
      if (code) {
        setResult(code.data);
        toast.success("QR Code decoded!");
      } else {
        setResult("");
        toast.error("No QR code found in image.");
      }
    };
    
    img.src = url;
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div 
        className="border-2 border-dashed border-white/20 rounded-2xl p-12 text-center hover:bg-white/5 transition-colors cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="w-12 h-12 text-primary mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2">Upload QR Code Image</h3>
        <p className="text-muted-foreground text-sm">Click to browse or drag and drop an image file</p>
        <input 
          type="file" 
          accept="image/*" 
          className="hidden" 
          ref={fileInputRef} 
          onChange={handleImage}
        />
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {result && (
        <div className="animate-in fade-in slide-in-from-bottom-4">
          <Label>Decoded Result</Label>
          <div className="relative mt-2">
            <Textarea 
              value={result} 
              readOnly 
              className="min-h-[100px] bg-black/60 font-mono text-primary pr-12 text-lg"
            />
            <Button 
              variant="secondary" 
              size="icon"
              onClick={() => {
                navigator.clipboard.writeText(result);
                toast.success("Copied!");
              }} 
              className="absolute right-2 top-2"
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function BarcodeGenerator() {
  const [text, setText] = useState("123456789012");
  const [format, setFormat] = useState("CODE128");
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/jsbarcode@3.11.6/dist/JsBarcode.all.min.js";
    script.async = true;
    script.onload = () => generateBarcode();
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  const generateBarcode = () => {
    if (!text || !svgRef.current || !(window as any).JsBarcode) return;
    try {
      (window as any).JsBarcode(svgRef.current, text, {
        format: format,
        lineColor: "#000",
        background: "#fff",
        width: 2,
        height: 100,
        displayValue: true
      });
    } catch(e) {
      // ignore validation errors while typing
    }
  };

  useEffect(() => {
    if ((window as any).JsBarcode) generateBarcode();
  }, [text, format]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <Label>Barcode Value</Label>
          <Input 
            value={text} 
            onChange={e => setText(e.target.value)} 
            className="mt-2 bg-black/40 font-mono text-lg h-12"
          />
        </div>
        
        <div>
          <Label>Format</Label>
          <select 
            value={format} 
            onChange={e => setFormat(e.target.value)}
            className="w-full mt-2 h-12 bg-black/40 border border-white/10 rounded-md px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="CODE128">Code 128</option>
            <option value="EAN13">EAN-13</option>
            <option value="UPC">UPC-A</option>
            <option value="EAN8">EAN-8</option>
            <option value="ITF14">ITF-14</option>
            <option value="MSI">MSI</option>
            <option value="pharmacode">Pharmacode</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center bg-card/30 p-8 rounded-xl border border-white/5">
        <div className="bg-white p-6 rounded-xl shadow-xl w-full flex justify-center overflow-hidden">
          <svg ref={svgRef} className="max-w-full"></svg>
        </div>
        <p className="text-muted-foreground text-xs mt-4 text-center">
          Right-click image and "Save Image As..." to download.
        </p>
      </div>
    </div>
  );
}

import { Copy } from "lucide-react";

export default function QrBarcodeTools({ active }: { active: string }) {
  return (
    <ToolPageLayout toolId={active}>
      {active === "qr-generator" && <QrGenerator />}
      {active === "qr-reader" && <QrReader />}
      {active === "barcode-generator" && <BarcodeGenerator />}
    </ToolPageLayout>
  );
}
