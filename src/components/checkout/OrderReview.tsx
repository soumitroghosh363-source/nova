import { placeholderImage } from "../../lib/placeholder";
import { ClayButton } from "../ui/ClayButton";
import { deliveryOptions } from "../../data/deliveryOptions";
import type { CartItem } from "../../types/cart";
import type { ShippingInfo, PaymentInfo } from "../../types/checkout";

interface OrderReviewProps {
  items: CartItem[];
  shippingInfo: ShippingInfo;
  deliveryId: string;
  paymentInfo: PaymentInfo;
  onBack: () => void;
  onPlaceOrder: () => void;
  isPlacing: boolean;
}

const OrderReview = ({
  items,
  shippingInfo,
  deliveryId,
  paymentInfo,
  onBack,
  onPlaceOrder,
  isPlacing,
}: OrderReviewProps) => {
  const delivery = deliveryOptions.find((d) => d.id === deliveryId)!;

  const subtotal = items.reduce((sum, item) => {
    const price = item.product.discount
      ? item.product.price * (1 - item.product.discount / 100)
      : item.product.price;
    return sum + price * item.quantity;
  }, 0);
  const total = subtotal + delivery.price;

  const maskedCard = `•••• •••• •••• ${paymentInfo.cardNumber.slice(-4)}`;

  return (
    <div>
      <div className="space-y-6">
        {/* Items */}
        <div>
          <h3 className="text-caption text-muted mb-3">Items</h3>
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.variant ?? "default"}`}
                className="flex items-center gap-3"
              >
                <div className="w-12 h-12 rounded-clay bg-background overflow-hidden shrink-0">
                  <img
                    src={placeholderImage(item.product.images[0], 80, 80)}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-body truncate">{item.product.name}</p>
                  <p className="text-caption text-muted">Qty {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-border" />

        {/* Shipping */}
        <div>
          <h3 className="text-caption text-muted mb-2">Shipping to</h3>
          <p className="text-body">{shippingInfo.fullName}</p>
          <p className="text-body text-muted">
            {shippingInfo.address}, {shippingInfo.city}{" "}
            {shippingInfo.postalCode}, {shippingInfo.country}
          </p>
        </div>

        <div className="h-px bg-border" />

        {/* Delivery */}
        <div>
          <h3 className="text-caption text-muted mb-2">Delivery</h3>
          <p className="text-body">
            {delivery.label} · {delivery.estimate}
          </p>
        </div>

        <div className="h-px bg-border" />

        {/* Payment */}
        <div>
          <h3 className="text-caption text-muted mb-2">Payment</h3>
          <p className="text-body">{maskedCard}</p>
        </div>

        <div className="h-px bg-border" />

        {/* Totals */}
        <div className="space-y-2">
          <div className="flex justify-between text-body">
            <span className="text-muted">Subtotal</span>
            <span>${subtotal.toFixed(0)}</span>
          </div>
          <div className="flex justify-between text-body">
            <span className="text-muted">Delivery</span>
            <span>{delivery.price === 0 ? "Free" : `$${delivery.price}`}</span>
          </div>
          <div className="flex justify-between text-title pt-2 border-t border-border">
            <span>Total</span>
            <span>${total.toFixed(0)}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-8">
        <ClayButton variant="secondary" onClick={onBack} disabled={isPlacing}>
          Back
        </ClayButton>
        <ClayButton
          className="flex-1"
          onClick={onPlaceOrder}
          disabled={isPlacing}
        >
          {isPlacing ? "Placing Order…" : "Place Order"}
        </ClayButton>
      </div>
    </div>
  );
};

export { OrderReview };
