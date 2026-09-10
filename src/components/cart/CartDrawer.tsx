import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { Sheet, SheetHeader, SheetTitle } from '../ui/sheet'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { updateQuantity, removeFromCart } from '../../redux/cartSlice'
import { placeholderImage } from '../../lib/placeholder'
import { ClayButton } from '../ui/ClayButton'

interface CartDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}


export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const dispatch = useAppDispatch()
  const items = useAppSelector((state) => state.cart.items)

  const subtotal = items.reduce((sum, item) => {
    const price = item.product.discount
      ? item.product.price * (1 - item.product.discount / 100)
      : item.product.price
    return sum + price * item.quantity
  }, 0)

  return (
    <Sheet
      isOpen={open}
      onOpenChange={onOpenChange}
      side="right"
      className="bg-background border-border flex flex-col"
    >
      <SheetHeader>
        <SheetTitle className="text-title">Your Cart</SheetTitle>
      </SheetHeader>

      {items.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
          <p className="text-body text-muted">Your cart is empty.</p>
          <Link to="/shop" onClick={() => onOpenChange(false)} className="mt-4">
            <ClayButton>Browse the Collection</ClayButton>
          </Link>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto px-4 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.variant ?? 'default'}`}
                className="flex gap-3 pb-4 border-b border-border last:border-0"
              >
                <div className="w-16 h-16 rounded-clay bg-surface overflow-hidden shrink-0">
                  <img
                    src={placeholderImage(item.product.images[0], 100, 100)}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-body font-medium truncate">
                    {item.product.name}
                  </p>
                  {item.variant && (
                    <p className="text-caption text-muted">{item.variant}</p>
                  )}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            productId: item.product.id,
                            variant: item.variant,
                            quantity: item.quantity - 1,
                          })
                        )
                      }
                      className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:bg-surface"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-caption w-4 text-center">
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
                          })
                        )
                      }
                      className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:bg-surface"
                    >
                      <Plus size={12} />
                    </button>

                    <button
                      type="button"
                      aria-label="Remove item"
                      onClick={() =>
                        dispatch(
                          removeFromCart({
                            productId: item.product.id,
                            variant: item.variant,
                          })
                        )
                      }
                      className="ml-auto text-muted hover:text-accent transition-colors"
                    >
                      <Trash2 size={14} />
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

          <div className="p-4 border-t border-border">
            <div className="flex items-center justify-between mb-4">
              <span className="text-body text-muted">Subtotal</span>
              <span className="text-title">${subtotal.toFixed(0)}</span>
            </div>
            <Link to="/cart" onClick={() => onOpenChange(false)}>
              <ClayButton className="w-full">View Cart & Checkout</ClayButton>
            </Link>
          </div>
        </>
      )}
    </Sheet>
  )
}