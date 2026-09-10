import { Link, useLocation, Navigate } from "react-router-dom";
import { ClayButton } from "../components/ui/ClayButton";

const OrderSuccess = () => {
  const location = useLocation();
  const orderNumber = location.state?.orderNumber as string | undefined;

  if (!orderNumber) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="px-6 md:px-10 py-24 max-w-xl mx-auto text-center">
      <p className="text-caption text-accent font-medium">ORDER CONFIRMED</p>
      <h1 className="text-headline mt-4">Thank you.</h1>
      <p className="text-body text-muted mt-4">
        Your order has been placed. A confirmation has been sent to your email.
      </p>
      <p className="text-title mt-8">#{orderNumber}</p>

      <div className="flex items-center justify-center gap-3 mt-10">
        <Link to="/orders">
          <ClayButton variant="secondary">View Order</ClayButton>
        </Link>
        <Link to="/shop">
          <ClayButton>Continue Shopping</ClayButton>
        </Link>
      </div>
    </div>
  );
};

export { OrderSuccess };
