import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { ProductGrid } from "../components/products/ProductGrid";
import { ClayButton } from "../components/ui/ClayButton";

const Wishlist = () => {
  const items = useAppSelector((state) => state.wishlist.items);

  if (items.length === 0) {
    return (
      <div className="px-6 md:px-10 py-24 max-w-7xl mx-auto text-center">
        <h1 className="text-headline">Your wishlist is empty</h1>
        <p className="text-body text-muted mt-4">
          Save pieces you love by tapping the heart icon on any product.
        </p>
        <Link to="/shop" className="inline-block mt-6">
          <ClayButton>Browse the Collection</ClayButton>
        </Link>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-10 py-16 max-w-7xl mx-auto">
      <h1 className="text-headline mb-2">Your Wishlist</h1>
      <p className="text-body text-muted mb-10">
        {items.length} {items.length === 1 ? "item" : "items"} saved
      </p>

      <ProductGrid products={items} />
    </div>
  );
};

export { Wishlist };
