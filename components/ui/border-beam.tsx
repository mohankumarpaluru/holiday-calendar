import React from "react";
import { cn } from "../../lib/utils";

interface BorderBeamProps {
  className?: string;
  duration?: number;
  colorFrom?: string;
  colorTo?: string;
  opacity?: number;
}

export const BorderBeam: React.FC<BorderBeamProps> = ({
  className,
  duration = 18,
  // Using CSS vars from index.html as defaults, but allowing overrides
  colorFrom,
  colorTo,
  opacity = 0.28,
}) => {
  return (
    <div
      aria-hidden
      style={
        {
          "--beam-from": colorFrom, // if undefined, falls back to CSS var in .border-beam
          "--beam-to": colorTo,
          animationDuration: `${duration}s`,
          opacity: opacity,
        } as React.CSSProperties
      }
      className={cn("border-beam rounded-[inherit]", className)}
    />
  );
};
export default BorderBeam;