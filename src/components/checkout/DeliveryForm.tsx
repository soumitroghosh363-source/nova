import { useState } from "react";
import { ClayButton } from "../ui/ClayButton";
import { deliveryOptions } from "../../data/deliveryOptions";

interface DeliveryFormProps {
  defaultValue?: string;
  onSubmit: (deliveryId: string) => void;
  onBack: () => void;
}

const DeliveryForm = ({
  defaultValue,
  onSubmit,
  onBack,
}: DeliveryFormProps) => {
  const [selected, setSelected] = useState(
    defaultValue ?? deliveryOptions[0].id,
  );

  return (
    <div>
      <fieldset>
        <legend className="text-caption text-muted mb-3">
          Choose a delivery speed
        </legend>

        <div className="space-y-3">
          {deliveryOptions.map((option) => (
            <label
              key={option.id}
              className={`flex items-center justify-between p-4 rounded-clay border cursor-pointer transition-colors ${
                selected === option.id
                  ? "border-accent bg-accent/5"
                  : "border-border bg-background hover:bg-surface"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="delivery"
                  value={option.id}
                  checked={selected === option.id}
                  onChange={() => setSelected(option.id)}
                  className="w-4 h-4 accent-(--color-accent)"
                />
                <div>
                  <p className="text-body font-medium">{option.label}</p>
                  <p className="text-caption text-muted">{option.estimate}</p>
                </div>
              </div>
              <p className="text-body font-medium">
                {option.price === 0 ? "Free" : `$${option.price}`}
              </p>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex gap-3 mt-6">
        <ClayButton variant="secondary" onClick={onBack}>
          Back
        </ClayButton>
        <ClayButton className="flex-1" onClick={() => onSubmit(selected)}>
          Continue to Payment
        </ClayButton>
      </div>
    </div>
  );
};

export { DeliveryForm };
