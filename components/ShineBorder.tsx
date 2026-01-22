import React from 'react';

interface ShineBorderProps {
  children: React.ReactNode;
  className?: string;
  color?: string | string[];
  borderRadius?: number;
  borderWidth?: number;
  duration?: number;
}

export const ShineBorder: React.FC<ShineBorderProps> = ({
  children,
  className = "",
  color = ["#A07CFE", "#FE8FB5", "#FFBE7B"],
  borderRadius = 12,
  borderWidth = 1,
  duration = 14,
}) => {
  return (
    <div
      className={`relative grid w-full place-items-center rounded-[--border-radius] bg-white dark:bg-slate-900 overflow-hidden ${className}`}
      style={{
        //@ts-ignore
        "--border-radius": `${borderRadius}px`,
      }}
    >
      <div
        className={`absolute inset-0 z-0 before:absolute before:inset-0 before:size-full before:rounded-[--border-radius] before:p-[--border-width] before:will-change-[background-position] before:content-[""] before:!bg-[length:300%_100%] before:[background-image:var(--background-radial-gradient)] before:[animation:shine_var(--duration)_linear_infinite] pointer-events-none`}
        style={{
          //@ts-ignore
          "--border-width": `${borderWidth}px`,
          "--duration": `${duration}s`,
          "--background-radial-gradient": `linear-gradient(60deg, ${Array.isArray(color) ? color.join(',') : color}, ${Array.isArray(color) ? color[0] : color})`,
           mask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
           maskComposite: 'exclude',
           WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
           WebkitMaskComposite: 'xor',
        }}
      ></div>
      <div className="z-10 w-full h-full">{children}</div>
      <style>{`
        @keyframes shine {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};