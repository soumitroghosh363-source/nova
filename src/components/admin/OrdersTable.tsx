import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import type { Order } from "../../types/order";
import { placeholderImage } from "../../lib/placeholder";

interface OrdersTableProps {
  orders: Order[];
}

const OrdersTable = ({ orders }: OrdersTableProps) => {
  const [query, setQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = orders.filter(
    (o) =>
      o.orderNumber.toLowerCase().includes(query.toLowerCase()) ||
      o.shippingInfo.fullName.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div>
      <div className="relative w-72 mb-4">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by order # or customer…"
          aria-label="Search orders"
          className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      <div className="bg-background border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted">
              <th className="px-4 py-3 font-medium">Order</th>
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Items</th>
              <th className="px-4 py-3 font-medium">Total</th>
              <th className="px-4 py-3 font-medium text-right">Details</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order, index) => {
              const isExpanded = expandedId === order.orderNumber;
              const itemCount = order.items.reduce(
                (sum, i) => sum + i.quantity,
                0,
              );

              return (
                <motion.tr
                  key={order.orderNumber}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                  className="border-b border-border last:border-0"
                >
                  <td colSpan={6} className="p-0">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedId(isExpanded ? null : order.orderNumber)
                      }
                      className="w-full text-left hover:bg-surface/50 transition-colors"
                      aria-expanded={isExpanded}
                    >
                      <div className="grid grid-cols-6 px-4 py-3 items-center">
                        <span className="font-medium">
                          #{order.orderNumber}
                        </span>
                        <span>{order.shippingInfo.fullName}</span>
                        <span className="text-muted">
                          {new Date(order.placedAt).toLocaleDateString(
                            undefined,
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </span>
                        <span className="text-muted">{itemCount}</span>
                        <span className="font-medium">
                          ${order.total.toFixed(0)}
                        </span>
                        <span className="flex justify-end text-muted">
                          {isExpanded ? (
                            <ChevronUp size={16} />
                          ) : (
                            <ChevronDown size={16} />
                          )}
                        </span>
                      </div>
                    </button>

                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.2 }}
                        className="px-4 pb-4 bg-surface/30"
                      >
                        <div className="flex gap-2 pt-3 flex-wrap">
                          {order.items.map((item) => (
                            <div
                              key={`${item.product.id}-${item.variant ?? "default"}`}
                              className="flex items-center gap-2 bg-background border border-border rounded-lg px-2 py-1.5"
                            >
                              <img
                                src={placeholderImage(
                                  item.product.images[0],
                                  32,
                                  32,
                                )}
                                alt=""
                                className="w-8 h-8 rounded object-cover"
                              />
                              <div>
                                <p className="text-xs font-medium">
                                  {item.product.name}
                                </p>
                                <p className="text-xs text-muted">
                                  Qty {item.quantity}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-muted mt-3">
                          Shipping to: {order.shippingInfo.address},{" "}
                          {order.shippingInfo.city}{" "}
                          {order.shippingInfo.postalCode},{" "}
                          {order.shippingInfo.country} · {order.deliveryLabel}
                        </p>
                      </motion.div>
                    )}
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted text-sm">
            {orders.length === 0
              ? "No orders placed yet."
              : `No orders match "${query}".`}
          </div>
        )}
      </div>
    </div>
  );
};

export { OrdersTable };
