import { Link } from "react-router-dom";
import { ProductGrid } from "../products/ProductGrid";
import { products } from "../../data/products";

const NewArrivals = () => {
  return (
    <section className="px-6 py-28 md:px-10 md:py-40">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-headline">New Arrivals</h2>
          <Link
            to="/shop"
            className="text-body text-muted hover:text-accent transition-colors"
          >
            View all →
          </Link>
        </div>
        <ProductGrid products={products} />
      </div>
    </section>
  );
};

export { NewArrivals };
