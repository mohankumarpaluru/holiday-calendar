  "use client";

  import { cn } from "@/lib/utils";

  type TColorProp = string | string[];

  interface ShineBorderDayProps {
    borderRadius?: number;
    borderWidth?: number;
    duration?: number;
    color?: TColorProp;
    className?: string;
    children: React.ReactNode;
  }

  export default function ShineBorderDay({
    borderRadius = 8,
    borderWidth = 1,
    duration = 14,
    color = "#000000",
    className,
    children,
  }: ShineBorderDayProps) {
    return (
      <div
        style={
          {
            "--border-radius": `${borderRadius}px`,
          } as React.CSSProperties
        }
        className={cn(
          "relative w-fit place-items-center rounded-[--border-radius] p-0",
          className,
        )}
      >
        <div
          style={
            {
              "--border-width": `${borderWidth}px`,
              "--border-radius": `${borderRadius}px`,
              "--duration": `${duration}s`,
              "--mask-linear-gradient": `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
              "--background-radial-gradient": `radial-gradient(transparent,transparent, ${color instanceof Array ? color.join(",") : color},transparent,transparent)`,
            } as React.CSSProperties
          }
          className={`pointer-events-none before:bg-shine-size before:absolute before:inset-0 before:size-full before:rounded-[--border-radius] before:p-[--border-width] before:will-change-[background-position] before:content-[""] before:![-webkit-mask-composite:xor] before:![mask-composite:exclude] before:[background-image:--background-radial-gradient] before:[background-size:300%_300%] before:[mask:--mask-linear-gradient] motion-safe:before:animate-shine`}
        ></div>
        {children}
      </div>
    );
  }
