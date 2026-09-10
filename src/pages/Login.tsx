import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { login } from "../redux/authSlice";
import { LoginForm } from "../components/auth/LoginForm";
import type { AuthUser } from "../types/auth";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: string })?.from ?? "/";

  const handleSuccess = (user: AuthUser) => {
    dispatch(login(user));
    navigate(user.role === "admin" ? "/admin" : from, { replace: true });
  };

  return (
    <div className="px-6 md:px-10 py-24 max-w-md mx-auto">
      <h1 className="text-headline mb-2">Sign In</h1>
      <p className="text-body text-muted mb-10">Welcome back to NOVA.</p>

      <LoginForm onSuccess={handleSuccess} />

      <p className="text-caption text-muted text-center mt-6">
        <Link to="/" className="hover:text-accent transition-colors">
          ← Back to homepage
        </Link>
      </p>
    </div>
  );
};

export { Login };
