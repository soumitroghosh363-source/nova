import { useState } from "react";
import { Link } from "react-router-dom";
import { CartDrawer } from "../cart/CartDrawer";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/authSlice";
import { MobileNav } from './MobileNav'

export function Navbar() {
  const [cartOpen, setCartOpen] = useState(false);
  const cartCount = useAppSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0),
  );
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="flex items-center justify-between px-6 py-4 md:px-10">
        <Link to="/" className="text-title font-extrabold tracking-tight">
          NOVA
        </Link>

        <div className="hidden md:flex items-center gap-8 text-body">
          <Link to="/shop" className="hover:text-accent transition-colors">
            Shop
          </Link>
          <Link
            to="/shop/audio"
            className="hover:text-accent transition-colors"
          >
            Audio
          </Link>
          <Link to="/shop/home" className="hover:text-accent transition-colors">
            Home
          </Link>
        </div>
        <MobileNav />

        <div className="flex items-center gap-4">
          {user ? (
            <button
              type="button"
              onClick={() => dispatch(logout())}
              className="hover:text-accent transition-colors"
            >
              Sign Out
            </button>
          ) : (
            <Link to="/login" className="hover:text-accent transition-colors">
              Sign In
            </Link>
          )}
          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="hover:text-accent transition-colors"
          >
            Wishlist
          </Link>
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            aria-label={`Cart, ${cartCount} items`}
            className="relative hover:text-accent transition-colors"
          >
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-accent text-accent-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </header>
  );
}
