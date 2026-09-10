import type { CheckoutStep } from "../../types/checkout";

const STEPS: { id: CheckoutStep; label: string }[] = [
  { id: "shipping", label: "Shipping" },
  { id: "delivery", label: "Delivery" },
  { id: "payment", label: "Payment" },
  { id: "review", label: "Review" },
];

interface CheckoutStepsProps {
  current: CheckoutStep;
}

const CheckoutSteps = ({ current }: CheckoutStepsProps) => {
  const currentIndex = STEPS.findIndex((s) => s.id === current);

  return (
    <ol className="flex items-center gap-2 md:gap-4 mb-10">
      {STEPS.map((step, index) => {
        const isComplete = index < currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <li key={step.id} className="flex items-center gap-2 md:gap-4">
            <div className="flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-caption shrink-0 ${
                  isCurrent
                    ? "bg-accent text-accent-foreground"
                    : isComplete
                      ? "bg-foreground text-background"
                      : "bg-surface border border-border text-muted"
                }`}
              >
                {index + 1}
              </span>
              <span
                className={`text-caption hidden sm:inline ${
                  isCurrent ? "text-foreground font-medium" : "text-muted"
                }`}
              >
                {step.label}
              </span>
            </div>

            {index < STEPS.length - 1 && (
              <div className="w-6 md:w-10 h-px bg-border" />
            )}
          </li>
        );
      })}
    </ol>
  );
};

export { CheckoutSteps };
