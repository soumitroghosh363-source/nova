import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { placeholderImage } from "../lib/placeholder";
import { ClayButton } from "../components/ui/ClayButton";

const Orders = () => {
  const orders = useAppSelector((state) => state.orders.items);

  if (orders.length === 0) {
    return (
      <div className="px-6 md:px-10 py-24 max-w-7xl mx-auto text-center">
        <h1 className="text-headline">No orders yet</h1>
        <p className="text-body text-muted mt-4">
          Your placed orders will show up here.
        </p>
        <Link to="/shop" className="inline-block mt-6">
          <ClayButton>Browse the Collection</ClayButton>
        </Link>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-10 py-16 max-w-4xl mx-auto">
      <h1 className="text-headline mb-10">Your Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.orderNumber}
            className="border border-border rounded-clay p-6"
          >
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <p className="text-body font-medium">#{order.orderNumber}</p>
                <p className="text-caption text-muted">
                  {new Date(order.placedAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <p className="text-title">${order.total.toFixed(0)}</p>
            </div>

            <div className="flex gap-2 mt-4">
              {order.items.map((item) => (
                <div
                  key={`${item.product.id}-${item.variant ?? "default"}`}
                  className="w-14 h-14 rounded-clay bg-surface overflow-hidden shrink-0"
                >
                  <img
                    src={placeholderImage(item.product.images[0], 80, 80)}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { Orders };
