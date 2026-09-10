import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ClayButton } from "../ui/ClayButton";
import type { PaymentInfo } from "../../types/checkout";

const paymentSchema = z.object({
  cardName: z.string().min(2, "Enter the name on your card"),
  cardNumber: z
    .string()
    .regex(/^\d{4} \d{4} \d{4} \d{4}$/, "Enter a valid 16-digit card number"),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY format"),
  cvc: z.string().regex(/^\d{3,4}$/, "Enter a valid CVC"),
});

interface PaymentFormProps {
  defaultValues?: Partial<PaymentInfo>;
  onSubmit: (data: PaymentInfo) => void;
  onBack: () => void;
}

const formatCardNumber = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
};

const formatExpiry = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
};

const PaymentForm = ({ defaultValues, onSubmit, onBack }: PaymentFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PaymentInfo>({
    resolver: zodResolver(paymentSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <p className="text-caption text-muted bg-background border border-border rounded-clay px-4 py-3">
        This is a demo checkout — no real payment is processed and no card data
        is transmitted or stored.
      </p>

      <div>
        <label
          htmlFor="cardName"
          className="text-caption text-muted block mb-1.5"
        >
          Name on Card
        </label>
        <input
          id="cardName"
          type="text"
          {...register("cardName")}
          className="w-full px-4 py-3 rounded-clay border border-border bg-background text-body focus:outline-none focus:ring-2 focus:ring-accent"
          aria-invalid={!!errors.cardName}
          aria-describedby={errors.cardName ? "cardName-error" : undefined}
        />
        {errors.cardName && (
          <p id="cardName-error" className="text-caption text-accent mt-1">
            {errors.cardName.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="cardNumber"
          className="text-caption text-muted block mb-1.5"
        >
          Card Number
        </label>
        <input
          id="cardNumber"
          type="text"
          inputMode="numeric"
          placeholder="1234 5678 9012 3456"
          value={watch("cardNumber") ?? ""}
          onChange={(e) =>
            setValue("cardNumber", formatCardNumber(e.target.value), {
              shouldValidate: true,
            })
          }
          className="w-full px-4 py-3 rounded-clay border border-border bg-background text-body focus:outline-none focus:ring-2 focus:ring-accent"
          aria-invalid={!!errors.cardNumber}
          aria-describedby={errors.cardNumber ? "cardNumber-error" : undefined}
        />
        {errors.cardNumber && (
          <p id="cardNumber-error" className="text-caption text-accent mt-1">
            {errors.cardNumber.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="expiry"
            className="text-caption text-muted block mb-1.5"
          >
            Expiry (MM/YY)
          </label>
          <input
            id="expiry"
            type="text"
            inputMode="numeric"
            placeholder="MM/YY"
            value={watch("expiry") ?? ""}
            onChange={(e) =>
              setValue("expiry", formatExpiry(e.target.value), {
                shouldValidate: true,
              })
            }
            className="w-full px-4 py-3 rounded-clay border border-border bg-background text-body focus:outline-none focus:ring-2 focus:ring-accent"
            aria-invalid={!!errors.expiry}
            aria-describedby={errors.expiry ? "expiry-error" : undefined}
          />
          {errors.expiry && (
            <p id="expiry-error" className="text-caption text-accent mt-1">
              {errors.expiry.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="cvc" className="text-caption text-muted block mb-1.5">
            CVC
          </label>
          <input
            id="cvc"
            type="text"
            inputMode="numeric"
            placeholder="123"
            {...register("cvc")}
            className="w-full px-4 py-3 rounded-clay border border-border bg-background text-body focus:outline-none focus:ring-2 focus:ring-accent"
            aria-invalid={!!errors.cvc}
            aria-describedby={errors.cvc ? "cvc-error" : undefined}
          />
          {errors.cvc && (
            <p id="cvc-error" className="text-caption text-accent mt-1">
              {errors.cvc.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-3 mt-2">
        <ClayButton type="button" variant="secondary" onClick={onBack}>
          Back
        </ClayButton>
        <ClayButton type="submit" className="flex-1">
          Continue to Review
        </ClayButton>
      </div>
    </form>
  );
};

export { PaymentForm };
