import { useEffect, useRef } from "react";
import { useColors } from "./ThemeContext";

export function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const c = useColors();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    // Set canvas dimensions
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = c.dark 
          ? `rgba(147, 197, 253, ${this.opacity})` // blue-300 with opacity
          : `rgba(59, 130, 246, ${this.opacity})`; // blue-500 with opacity
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 15000);
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };

    const drawConnections = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = c.dark 
              ? `rgba(147, 197, 253, ${0.15 - distance / 800})`
              : `rgba(59, 130, 246, ${0.15 - distance / 800})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      drawConnections();
      
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [c.dark]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 opacity-60"
      style={{ mixBlendMode: c.dark ? "screen" : "multiply" }}
    />
  );
}
