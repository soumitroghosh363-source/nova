import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { clearCart } from "../redux/cartSlice";
import { CheckoutSteps } from "../components/checkout/CheckoutSteps";
import { ShippingForm } from "../components/checkout/ShippingForm";
import { DeliveryForm } from "../components/checkout/DeliveryForm";
import { PaymentForm } from "../components/checkout/PaymentForm";
import { OrderReview } from "../components/checkout/OrderReview";
import { ClayButton } from "../components/ui/ClayButton";
import type {
  CheckoutStep,
  ShippingInfo,
  PaymentInfo,
} from "../types/checkout";
import { addOrder } from "../redux/ordersSlice";
import { deliveryOptions } from "../data/deliveryOptions";
import type { Order } from "../types/order";

const generateOrderNumber = () => {
  const random = Math.floor(1000 + Math.random() * 9000);
  return `NOVA-${random}`;
};

const Checkout = () => {
  const items = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState<CheckoutStep>("shipping");
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null);
  const [deliveryId, setDeliveryId] = useState<string | null>(null);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  const [isPlacing, setIsPlacing] = useState(false);

  if (items.length === 0) {
    return (
      <div className="px-6 md:px-10 py-24 max-w-7xl mx-auto text-center">
        <h1 className="text-headline">Nothing to check out</h1>
        <p className="text-body text-muted mt-4">
          Your cart is empty — add something first.
        </p>
        <Link to="/shop" className="inline-block mt-6">
          <ClayButton>Browse the Collection</ClayButton>
        </Link>
      </div>
    );
  }

  const handleShippingSubmit = (data: ShippingInfo) => {
    setShippingInfo(data);
    setStep("delivery");
  };

  const handleDeliverySubmit = (id: string) => {
    setDeliveryId(id);
    setStep("payment");
  };

  const handlePaymentSubmit = (data: PaymentInfo) => {
    setPaymentInfo(data);
    setStep("review");
  };

  function handlePlaceOrder() {
    if (!shippingInfo || !deliveryId) return;

    setIsPlacing(true);

    setTimeout(() => {
      const orderNumber = generateOrderNumber();
      const delivery = deliveryOptions.find((d) => d.id === deliveryId)!;
      const subtotal = items.reduce((sum, item) => {
        const price = item.product.discount
          ? item.product.price * (1 - item.product.discount / 100)
          : item.product.price;
        return sum + price * item.quantity;
      }, 0);

      const order: Order = {
        orderNumber,
        items,
        shippingInfo,
        deliveryLabel: delivery.label,
        subtotal,
        deliveryPrice: delivery.price,
        total: subtotal + delivery.price,
        placedAt: new Date().toISOString(),
      };

      dispatch(addOrder(order));
      dispatch(clearCart());
      navigate("/order-success", { state: { orderNumber } });
    }, 800);
  }

  return (
    <div className="px-6 md:px-10 py-16 max-w-3xl mx-auto">
      <h1 className="text-headline mb-2">Checkout</h1>
      <p className="text-body text-muted mb-10">
        {items.length} {items.length === 1 ? "item" : "items"} · Step{" "}
        {["shipping", "delivery", "payment", "review"].indexOf(step) + 1} of 4
      </p>

      <CheckoutSteps current={step} />

      <div className="bg-surface border border-border rounded-clay p-8">
        {step === "shipping" && (
          <ShippingForm
            defaultValues={shippingInfo ?? undefined}
            onSubmit={handleShippingSubmit}
          />
        )}

        {step === "delivery" && (
          <DeliveryForm
            defaultValue={deliveryId ?? undefined}
            onSubmit={handleDeliverySubmit}
            onBack={() => setStep("shipping")}
          />
        )}

        {step === "payment" && (
          <PaymentForm
            defaultValues={paymentInfo ?? undefined}
            onSubmit={handlePaymentSubmit}
            onBack={() => setStep("delivery")}
          />
        )}

        {step === "review" && shippingInfo && deliveryId && paymentInfo && (
          <OrderReview
            items={items}
            shippingInfo={shippingInfo}
            deliveryId={deliveryId}
            paymentInfo={paymentInfo}
            onBack={() => setStep("payment")}
            onPlaceOrder={handlePlaceOrder}
            isPlacing={isPlacing}
          />
        )}
      </div>
    </div>
  );
};

export { Checkout };
