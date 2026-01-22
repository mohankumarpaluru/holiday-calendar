"use client";
import React from "react";
import { cn } from "../../lib/utils";

type TColorProp = string | string[];

interface ShineBorderProps {
  borderRadius?: number;
  borderWidth?: number;
  duration?: number;
  color?: TColorProp;
  className?: string;
  children?: React.ReactNode;
}

export function ShineBorder({
  borderRadius = 12,
  borderWidth = 1.2,
  duration = 14,
  color, // if provided, overrides CSS vars (via inline style) but defaults are better
  className,
  children,
}: ShineBorderProps) {
  
  const styles: React.CSSProperties = {
    "--border-radius": `${borderRadius}px`,
    "--border-width": `${borderWidth}px`,
    "--duration": `${duration}s`,
  } as React.CSSProperties;

  // If explicit colors provided, override the CSS vars
  if (color) {
    const colors = Array.isArray(color) ? color : [color, color, color];
    styles["--shine-c1"] = colors[0];
    styles["--shine-c2"] = colors[1] || colors[0];
    styles["--shine-c3"] = colors[2] || colors[0];
  }

  return (
    <div
      style={styles}
      className={cn("shine-border rounded-[var(--border-radius)]", className)}
    >
      <div className="shine-layer rounded-[var(--border-radius)]" aria-hidden />
      <div className="card-content rounded-[var(--border-radius)] h-full w-full">
        {children}
      </div>
    </div>
  );
}
export default ShineBorder;