import { type HTMLAttributes, type ReactNode } from "react";

interface ClaySurfaceProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const ClaySurface = ({
  children,
  className = "",
  ...props
}: ClaySurfaceProps) => {
  return (
    <div
      className={`bg-surface rounded-clay p-4 shadow-sm border border-border ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export { ClaySurface };
