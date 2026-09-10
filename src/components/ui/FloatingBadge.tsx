import { type ReactNode } from "react";

interface FloatingBadgeProps {
  children: ReactNode;
  tone?: "accent" | "neutral";
}

const FloatingBadge = ({ children, tone = "accent" }: FloatingBadgeProps) => {
  const tones = {
    accent: "bg-accent text-accent-foreground",
    neutral: "bg-surface text-foreground border border-border",
  };
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-caption ${tones[tone]} shadow-sm`}
    >
      {children}
    </span>
  );
};

export { FloatingBadge };
