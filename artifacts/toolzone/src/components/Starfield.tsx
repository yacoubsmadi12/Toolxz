import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;       // depth 0=far, 1=close
  size: number;
  speed: number;
  opacity: number;
  twinkleOffset: number;
}

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const COUNT = 500;
    const stars: Star[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random(),
      size: Math.random() * 1.4 + 0.3,
      speed: Math.random() * 0.25 + 0.04,
      opacity: Math.random() * 0.6 + 0.2,
      twinkleOffset: Math.random() * Math.PI * 2,
    }));

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / width - 0.5) * 2;
      targetMouseY = (e.clientY / height - 0.5) * 2;
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    let animId: number;
    let t = 0;

    const animate = () => {
      t += 0.008;
      // Smooth mouse follow
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      for (const star of stars) {
        // Drift downward
        star.y += star.speed;
        if (star.y > height + 2) {
          star.y = -2;
          star.x = Math.random() * width;
        }

        // Parallax offset
        const px = star.x + mouseX * star.z * 18;
        const py = star.y + mouseY * star.z * 18;

        // Twinkle
        const twinkle = 0.75 + 0.25 * Math.sin(t + star.twinkleOffset);
        const alpha = star.opacity * twinkle;

        ctx.beginPath();
        ctx.arc(px, py, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.65 }}
    />
  );
}
