import { type ButtonHTMLAttributes, type ReactNode } from "react";

interface ClayButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
}
const ClayButton = ({
  children,
  variant = "primary",
  className = "",
  ...props
}: ClayButtonProps) => {
  const base =
    'inline-flex items-center justify-center px-6 py-3 rounded-clay text-body font-medium transition-transform duration-150 ease-out active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'

  const variants = {
    primary:
      "bg-accent text-accent-foreground shadow-md hover:shadow-xl hover:-translate-y-0.5",
    secondary:
      "bg-surface text-foreground border border-border hover:bg-border/40 hover:-translate-y-0.5",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export { ClayButton };
