import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { updateQuantity, removeFromCart } from "../redux/cartSlice";
import { placeholderImage } from "../lib/placeholder";
import { ClayButton } from "../components/ui/ClayButton";

const Cart = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);

  const subtotal = items.reduce((sum, item) => {
    const price = item.product.discount
      ? item.product.price * (1 - item.product.discount / 100)
      : item.product.price;
    return sum + price * item.quantity;
  }, 0);

  const shipping = subtotal > 0 && subtotal < 100 ? 8 : 0;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="px-6 md:px-10 py-24 max-w-7xl mx-auto text-center">
        <h1 className="text-headline">Your cart is empty</h1>
        <p className="text-body text-muted mt-4">
          Looks like you haven't added anything yet.
        </p>
        <Link to="/shop" className="inline-block mt-6">
          <ClayButton>Browse the Collection</ClayButton>
        </Link>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-10 py-16 max-w-7xl mx-auto">
      <h1 className="text-headline mb-10">Your Cart</h1>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Line items */}
        <div className="flex-1 space-y-6">
          {items.map((item) => (
            <div
              key={`${item.product.id}-${item.variant ?? "default"}`}
              className="flex gap-4 pb-6 border-b border-border last:border-0"
            >
              <Link
                to={`/product/${item.product.slug}`}
                className="w-24 h-24 rounded-clay bg-surface overflow-hidden shrink-0"
              >
                <img
                  src={placeholderImage(item.product.images[0], 200, 200)}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />
              </Link>

              <div className="flex-1 min-w-0">
                <Link to={`/product/${item.product.slug}`}>
                  <p className="text-body font-medium hover:text-accent transition-colors">
                    {item.product.name}
                  </p>
                </Link>
                {item.variant && (
                  <p className="text-caption text-muted mt-1">{item.variant}</p>
                )}
                <p className="text-caption text-muted mt-1 capitalize">
                  {item.product.category}
                </p>

                <div className="flex items-center gap-3 mt-3">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          productId: item.product.id,
                          variant: item.variant,
                          quantity: item.quantity - 1,
                        }),
                      )
                    }
                    className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-surface"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="text-body w-5 text-center">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          productId: item.product.id,
                          variant: item.variant,
                          quantity: item.quantity + 1,
                        }),
                      )
                    }
                    className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-surface"
                  >
                    <Plus size={13} />
                  </button>

                  <button
                    type="button"
                    aria-label="Remove item"
                    onClick={() =>
                      dispatch(
                        removeFromCart({
                          productId: item.product.id,
                          variant: item.variant,
                        }),
                      )
                    }
                    className="ml-4 flex items-center gap-1 text-caption text-muted hover:text-accent transition-colors"
                  >
                    <Trash2 size={13} />
                    Remove
                  </button>
                </div>
              </div>

              <p className="text-body font-medium shrink-0">
                $
                {(
                  (item.product.discount
                    ? item.product.price * (1 - item.product.discount / 100)
                    : item.product.price) * item.quantity
                ).toFixed(0)}
              </p>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="w-full lg:w-80 shrink-0">
          <div className="bg-surface rounded-clay border border-border p-6 sticky top-24">
            <h2 className="text-title mb-4">Order Summary</h2>

            <div className="space-y-2 text-body">
              <div className="flex justify-between">
                <span className="text-muted">Subtotal</span>
                <span>${subtotal.toFixed(0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Shipping</span>
                <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
              </div>
            </div>

            <div className="flex justify-between text-title mt-4 pt-4 border-t border-border">
              <span>Total</span>
              <span>${total.toFixed(0)}</span>
            </div>

            <Link to="/checkout" className="block mt-6">
              <ClayButton className="w-full">Proceed to Checkout</ClayButton>
            </Link>

            {shipping > 0 && (
              <p className="text-caption text-muted mt-3 text-center">
                Add ${(100 - subtotal).toFixed(0)} more for free shipping
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { Cart };
