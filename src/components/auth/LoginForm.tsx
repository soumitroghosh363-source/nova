import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { ClayButton } from "../ui/ClayButton";
import { mockAccounts } from "../../data/mockAccounts";
import type { AuthUser } from "../../types/auth";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Enter your password"),
});

type LoginValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSuccess: (user: AuthUser) => void;
}

const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginValues) => {
    setAuthError(null);

    const match = mockAccounts.find(
      (account) => account.email.toLowerCase() === data.email.toLowerCase(),
    );

    if (!match || match.password !== data.password) {
      setAuthError("Incorrect email or password.");
      return;
    }

    const { password, ...user } = match;
    onSuccess(user);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {authError && (
        <p
          role="alert"
          className="text-caption text-accent bg-accent/10 rounded-clay px-4 py-3"
        >
          {authError}
        </p>
      )}

      <div>
        <label htmlFor="email" className="text-caption text-muted block mb-1.5">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
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
          htmlFor="password"
          className="text-caption text-muted block mb-1.5"
        >
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            {...register("password")}
            className="w-full px-4 py-3 pr-11 rounded-clay border border-border bg-background text-body focus:outline-none focus:ring-2 focus:ring-accent"
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "password-error" : undefined}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.password && (
          <p id="password-error" className="text-caption text-accent mt-1">
            {errors.password.message}
          </p>
        )}
      </div>

      <ClayButton type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Signing in…" : "Sign In"}
      </ClayButton>

      <div className="text-caption text-muted bg-surface rounded-clay px-4 py-3 space-y-1">
        <p className="font-medium text-foreground">Demo accounts</p>
        <p>Customer: alex@nova.com / customer123</p>
        <p>Admin: admin@nova.com / admin123</p>
      </div>
    </form>
  );
};

export { LoginForm };
