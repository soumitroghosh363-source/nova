import { useParams, Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useProduct } from "../hooks/useProducts";
import { ClayButton } from "../components/ui/ClayButton";
import { ProductGallery } from "../components/products/ProductGallery";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { toggleWishlist } from "../redux/wishlistSlice";
import { addToCart } from "../redux/cartSlice";

const ProductDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading, error } = useProduct(slug ?? "");

  const cartItems = useAppSelector((state) => state.cart.items);
  const cartQuantity =
    cartItems.find((item) => item.product.id === product?.id)?.quantity ?? 0;

  const dispatch = useAppDispatch();
  const isWishlisted = useAppSelector((state) =>
    product
      ? state.wishlist.items.some((item) => item.id === product.id)
      : false,
  );

  if (isLoading) {
    return (
      <div className="px-6 md:px-10 py-16 max-w-7xl mx-auto">
        <p className="text-body text-muted">Loading product…</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="px-6 md:px-10 py-16 max-w-7xl mx-auto text-center">
        <h1 className="text-headline">Product not found</h1>
        <p className="text-body text-muted mt-4">
          We couldn't find the product you're looking for.
        </p>
        <Link to="/shop" className="inline-block mt-6">
          <ClayButton>Back to Shop</ClayButton>
        </Link>
      </div>
    );
  }

  const hasDiscount = !!product.discount && product.discount > 0;
  const finalPrice = hasDiscount
    ? product.price * (1 - product.discount! / 100)
    : product.price;

  return (
    <div className="px-6 md:px-10 py-16 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-10 md:gap-16">
        <div className="w-full md:w-1/2">
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        <div className="w-full md:w-1/2">
          <p className="text-caption text-accent font-medium capitalize">
            {product.category}
          </p>
          <h1 className="text-headline mt-2">{product.name}</h1>

          <div className="flex items-center gap-3 mt-4">
            {hasDiscount ? (
              <>
                <span className="text-title text-accent">
                  ${finalPrice.toFixed(0)}
                </span>
                <span className="text-body text-muted line-through">
                  ${product.price.toFixed(0)}
                </span>
              </>
            ) : (
              <span className="text-title">${product.price.toFixed(0)}</span>
            )}
          </div>

          <p className="text-body text-muted mt-6 max-w-md">
            {product.description}
          </p>

          <div className="flex items-center gap-2 mt-4 text-caption text-muted">
            <span>★ {product.rating}</span>
            <span>·</span>
            <span>{product.reviewCount} reviews</span>
            <span>·</span>
            <span>
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </span>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <ClayButton
              disabled={product.stock === 0}
              onClick={() => dispatch(addToCart({ product }))}
            >
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </ClayButton>

            <button
              type="button"
              onClick={() => dispatch(toggleWishlist(product))}
              aria-label={
                isWishlisted ? "Remove from wishlist" : "Add to wishlist"
              }
              aria-pressed={isWishlisted}
              className="w-12 h-12 rounded-clay border border-border flex items-center justify-center hover:bg-surface transition-colors active:scale-95"
            >
              <Heart
                size={18}
                className={
                  isWishlisted ? "fill-accent text-accent" : "text-foreground"
                }
              />
            </button>
          </div>
          {cartQuantity > 0 && (
            <p className="text-caption text-muted mt-2">
              {cartQuantity} already in your cart
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export { ProductDetails };
