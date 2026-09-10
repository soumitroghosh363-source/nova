import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ClayButton } from "../ui/ClayButton";
import type { ShippingInfo } from "../../types/checkout";

const shippingSchema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email address"),
  address: z.string().min(5, "Enter your street address"),
  city: z.string().min(2, "Enter your city"),
  postalCode: z.string().min(3, "Enter a valid postal code"),
  country: z.string().min(2, "Enter your country"),
});

interface ShippingFormProps {
  defaultValues?: Partial<ShippingInfo>;
  onSubmit: (data: ShippingInfo) => void;
}

const ShippingForm = ({ defaultValues, onSubmit }: ShippingFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingInfo>({
    resolver: zodResolver(shippingSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label
          htmlFor="fullName"
          className="text-caption text-muted block mb-1.5"
        >
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          {...register("fullName")}
          className="w-full px-4 py-3 rounded-clay border border-border bg-background text-body focus:outline-none focus:ring-2 focus:ring-accent"
          aria-invalid={!!errors.fullName}
          aria-describedby={errors.fullName ? "fullName-error" : undefined}
        />
        {errors.fullName && (
          <p id="fullName-error" className="text-caption text-accent mt-1">
            {errors.fullName.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="text-caption text-muted block mb-1.5">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className="w-full px-4 py-3 rounded-clay border border-border bg-background text-body focus:outline-none focus:ring-2 focus:ring-accent"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className="text-caption text-accent mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="address"
          className="text-caption text-muted block mb-1.5"
        >
          Street Address
        </label>
        <input
          id="address"
          type="text"
          {...register("address")}
          className="w-full px-4 py-3 rounded-clay border border-border bg-background text-body focus:outline-none focus:ring-2 focus:ring-accent"
          aria-invalid={!!errors.address}
          aria-describedby={errors.address ? "address-error" : undefined}
        />
        {errors.address && (
          <p id="address-error" className="text-caption text-accent mt-1">
            {errors.address.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="city"
            className="text-caption text-muted block mb-1.5"
          >
            City
          </label>
          <input
            id="city"
            type="text"
            {...register("city")}
            className="w-full px-4 py-3 rounded-clay border border-border bg-background text-body focus:outline-none focus:ring-2 focus:ring-accent"
            aria-invalid={!!errors.city}
            aria-describedby={errors.city ? "city-error" : undefined}
          />
          {errors.city && (
            <p id="city-error" className="text-caption text-accent mt-1">
              {errors.city.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="postalCode"
            className="text-caption text-muted block mb-1.5"
          >
            Postal Code
          </label>
          <input
            id="postalCode"
            type="text"
            {...register("postalCode")}
            className="w-full px-4 py-3 rounded-clay border border-border bg-background text-body focus:outline-none focus:ring-2 focus:ring-accent"
            aria-invalid={!!errors.postalCode}
            aria-describedby={
              errors.postalCode ? "postalCode-error" : undefined
            }
          />
          {errors.postalCode && (
            <p id="postalCode-error" className="text-caption text-accent mt-1">
              {errors.postalCode.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="country"
          className="text-caption text-muted block mb-1.5"
        >
          Country
        </label>
        <input
          id="country"
          type="text"
          {...register("country")}
          className="w-full px-4 py-3 rounded-clay border border-border bg-background text-body focus:outline-none focus:ring-2 focus:ring-accent"
          aria-invalid={!!errors.country}
          aria-describedby={errors.country ? "country-error" : undefined}
        />
        {errors.country && (
          <p id="country-error" className="text-caption text-accent mt-1">
            {errors.country.message}
          </p>
        )}
      </div>

      <ClayButton type="submit" className="w-full mt-2">
        Continue to Delivery
      </ClayButton>
    </form>
  );
};

export { ShippingForm };
