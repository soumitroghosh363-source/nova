import { motion } from "framer-motion";
import type { TopProduct } from "../../lib/deriveAnalytics";
import { placeholderImage } from "../../lib/placeholder";

interface TopProductsTableProps {
  products: TopProduct[];
}

const TopProductsTable = ({ products }: TopProductsTableProps) => {
  if (products.length === 0) {
    return (
      <div className="bg-background border border-border rounded-xl p-8 text-center text-sm text-muted">
        No sales data yet — top products appear here once orders are placed.
      </div>
    );
  }

  const maxUnits = products[0].unitsSold;

  return (
    <div className="bg-background border border-border rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left text-muted">
            <th className="px-4 py-3 font-medium">Product</th>
            <th className="px-4 py-3 font-medium">Units Sold</th>
            <th className="px-4 py-3 font-medium">Revenue</th>
          </tr>
        </thead>
        <tbody>
          {products.slice(0, 5).map((product, index) => (
            <motion.tr
              key={product.productId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: index * 0.04 }}
              className="border-b border-border last:border-0"
            >
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <img
                    src={placeholderImage(product.image, 60, 60)}
                    alt=""
                    className="w-9 h-9 rounded-lg object-cover"
                  />
                  <span className="font-medium">{product.name}</span>
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="w-24 h-1.5 rounded-full bg-surface overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(product.unitsSold / maxUnits) * 100}%`,
                      }}
                      transition={{ duration: 0.5, delay: index * 0.04 + 0.1 }}
                      className="h-full bg-accent rounded-full"
                    />
                  </div>
                  <span>{product.unitsSold}</span>
                </div>
              </td>
              <td className="px-4 py-3 font-medium">
                ${product.revenue.toFixed(0)}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { TopProductsTable };
