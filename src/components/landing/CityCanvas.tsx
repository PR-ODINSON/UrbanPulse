import React, { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  size: number;
  pulse: number;
  pulseSpeed: number;
  isAccent: boolean;
}

interface GridLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  progress: number;
  delay: number;
  speed: number;
}

export default function CityCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    let animId = 0;
    let startTime: number | null = null;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const cols = 14;
    const rows = 10;
    const vanishX = canvas.width * 0.5;
    const vanishY = canvas.height * 0.08;
    const baseY = canvas.height * 1.1;
    const spread = canvas.width * 1.4;

    function getGridPoint(col: number, row: number) {
      const t = row / rows;
      const ease = Math.pow(t, 1.4);
      const x = vanishX + (col / cols - 0.5) * spread * ease;
      const y = vanishY + (baseY - vanishY) * ease;
      return { x, y };
    }

    const lines: GridLine[] = [];
    let lineIndex = 0;

    for (let row = 1; row < rows; row += 1) {
      const p1 = getGridPoint(0, row);
      const p2 = getGridPoint(cols, row);
      lines.push({
        x1: p1.x,
        y1: p1.y,
        x2: p2.x,
        y2: p2.y,
        progress: 0,
        delay: lineIndex * 60,
        speed: 0.012,
      });
      lineIndex += 1;
    }

    for (let col = 0; col <= cols; col += 1) {
      const p1 = getGridPoint(col, 0);
      const p2 = getGridPoint(col, rows);
      lines.push({
        x1: p1.x,
        y1: p1.y,
        x2: p2.x,
        y2: p2.y,
        progress: 0,
        delay: lineIndex * 45,
        speed: 0.008,
      });
      lineIndex += 1;
    }

    const nodes: Node[] = [];
    for (let row = 1; row < rows; row += 1) {
      for (let col = 1; col < cols; col += 1) {
        if (Math.random() > 0.55) {
          continue;
        }
        const { x, y } = getGridPoint(col, row);
        const isAccent = Math.random() < 0.08;
        nodes.push({
          x,
          y,
          size: isAccent ? 3.5 : 1.8,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.4 + Math.random() * 0.6,
          isAccent,
        });
      }
    }

    function draw(timestamp: number) {
      if (!startTime) {
        startTime = timestamp;
      }
      const elapsed = timestamp - startTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0C0C0C";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      lines.forEach((line) => {
        const lineElapsed = elapsed - line.delay;
        if (lineElapsed <= 0) {
          return;
        }

        line.progress = Math.min(1, line.progress + line.speed);
        const px = line.x1 + (line.x2 - line.x1) * line.progress;
        const py = line.y1 + (line.y2 - line.y1) * line.progress;

        const yRatio = (line.y1 - vanishY) / (baseY - vanishY);
        const alpha = 0.04 + yRatio * 0.14;

        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(px, py);
        ctx.strokeStyle = `rgba(247, 245, 240, ${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        if (line.progress < 1) {
          ctx.beginPath();
          ctx.arc(px, py, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(212, 168, 83, ${0.6 * (1 - line.progress)})`;
          ctx.fill();
        }
      });

      const allDone = lines.every((line) => line.progress >= 1);
      if (allDone) {
        const t = elapsed / 1000;
        nodes.forEach((node) => {
          const pulseFactor = 0.5 + 0.5 * Math.sin(t * node.pulseSpeed + node.pulse);

          if (node.isAccent) {
            const ringR = node.size + 4 * pulseFactor;
            ctx.beginPath();
            ctx.arc(node.x, node.y, ringR, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(212, 168, 83, ${0.15 * pulseFactor})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(212, 168, 83, ${0.6 + 0.4 * pulseFactor})`;
            ctx.fill();
            return;
          }

          ctx.beginPath();
          ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(247, 245, 240, ${0.25 + 0.2 * pulseFactor})`;
          ctx.fill();
        });
      }

      animId = window.requestAnimationFrame(draw);
    }

    animId = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  );
}
