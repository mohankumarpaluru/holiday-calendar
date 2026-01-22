import React, { useRef, useEffect, useMemo } from 'react';

interface FlickeringGridProps {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  color?: string;
  maxOpacity?: number;
  className?: string;
}

export const FlickeringGrid: React.FC<FlickeringGridProps> = ({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color = "rgb(0, 0, 0)",
  maxOpacity = 0.3,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useRef(true); 
  const memoizedColor = useMemo(() => {
      const toRgb = (color: string) => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (!ctx) return "0, 0, 0";
          ctx.fillStyle = color;
          return ctx.fillStyle;
      };
      return toRgb(color);
  }, [color]);


  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let gridParams: {
        cols: number;
        rows: number;
        squares: Float32Array;
    };

    const draw = () => {
        if (!gridParams) return;
        const { cols, rows, squares } = gridParams;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                const idx = i * rows + j;
                const opacity = squares[idx];
                
                // Randomly update opacity
                if (Math.random() < flickerChance) {
                     squares[idx] = Math.random() * maxOpacity;
                }

                ctx.fillStyle = memoizedColor;
                ctx.globalAlpha = opacity;
                ctx.fillRect(
                    i * (squareSize + gridGap),
                    j * (squareSize + gridGap),
                    squareSize,
                    squareSize
                );
                ctx.globalAlpha = 1;
            }
        }
    };

    const setupGrid = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      const cols = Math.floor(width / (squareSize + gridGap));
      const rows = Math.floor(height / (squareSize + gridGap));

      const squares = new Float32Array(cols * rows);
      for (let i = 0; i < squares.length; i++) {
        squares[i] = Math.random() * maxOpacity;
      }

      gridParams = { cols, rows, squares };
      
      // Draw immediately to prevent flash
      draw();
    };

    const loop = () => {
        if (isInView.current) {
            draw();
        }
        animationFrameId = requestAnimationFrame(loop);
    };

    setupGrid();
    loop();

    const resizeObserver = new ResizeObserver(() => {
      setupGrid();
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [squareSize, gridGap, flickerChance, maxOpacity, memoizedColor]);

  return (
    <div ref={containerRef} className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};