import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Pencil, Trash2, Plus, Search } from "lucide-react";
import type { Product } from "../../types/product";
import { placeholderImage } from "../../lib/placeholder";

interface ProductsTableProps {
  products: Product[];
  onDelete: (id: string) => void;
}

const ProductsTable = ({ products, onDelete }: ProductsTableProps) => {
  const [query, setQuery] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="relative w-72">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products…"
            aria-label="Search products"
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <Link
          to="/admin/products/new"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors"
        >
          <Plus size={16} />
          Add Product
        </Link>
      </div>

      <div className="bg-background border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted">
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Stock</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product, index) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
                className="border-b border-border last:border-0 hover:bg-surface/50"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={placeholderImage(product.images[0], 40, 40)}
                      alt=""
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <span className="font-medium">{product.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted capitalize">
                  {product.category}
                </td>
                <td className="px-4 py-3">${product.price.toFixed(0)}</td>
                <td className="px-4 py-3">
                  <span
                    className={
                      product.stock <= 5 ? "text-red-500 font-medium" : ""
                    }
                  >
                    {product.stock}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex px-2 py-0.5 rounded-full text-xs ${
                      product.stock === 0
                        ? "bg-red-100 text-red-600"
                        : product.stock <= 5
                          ? "bg-amber-100 text-amber-700"
                          : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {product.stock === 0
                      ? "Out of stock"
                      : product.stock <= 5
                        ? "Low stock"
                        : "In stock"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      to={`/admin/products/${product.id}/edit`}
                      aria-label={`Edit ${product.name}`}
                      className="p-1.5 rounded-md hover:bg-surface transition-colors"
                    >
                      <Pencil size={15} />
                    </Link>

                    {confirmDeleteId === product.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            onDelete(product.id);
                            setConfirmDeleteId(null);
                          }}
                          className="text-xs text-red-600 font-medium px-2 py-1 rounded-md hover:bg-red-50"
                        >
                          Confirm
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(null)}
                          className="text-xs text-muted px-2 py-1 rounded-md hover:bg-surface"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(product.id)}
                        aria-label={`Delete ${product.name}`}
                        className="p-1.5 rounded-md hover:bg-red-50 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted text-sm">
            No products match "{query}".
          </div>
        )}
      </div>
    </div>
  );
};

export { ProductsTable };
