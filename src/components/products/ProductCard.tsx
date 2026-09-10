import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import type { Product } from '../../types/product'
import { placeholderImage } from '../../lib/placeholder'
import { FloatingBadge } from '../ui/FloatingBadge'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { toggleWishlist } from '../../redux/wishlistSlice'

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch()
  const isWishlisted = useAppSelector((state) =>
    state.wishlist.items.some((item) => item.id === product.id)
  )

  const hasDiscount = !!product.discount && product.discount > 0
  const finalPrice = hasDiscount
    ? product.price * (1 - product.discount! / 100)
    : product.price

  return (
    <div className="group relative transition-transform duration-300 ease-out hover:-translate-y-1">
      <div className="relative">
        <Link to={`/product/${product.slug}`} className="block">
          <div className="relative aspect-4/5 rounded-clay bg-surface border border-border overflow-hidden shadow-sm group-hover:shadow-lg transition-shadow duration-300">
            <motion.img
              src={placeholderImage(product.images[0], 600, 750)}
              alt={product.name}
              className="w-full h-full object-cover"
              loading="lazy"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />

            {hasDiscount && (
              <div className="absolute top-3 left-3">
                <FloatingBadge>−{product.discount}%</FloatingBadge>
              </div>
            )}

            {product.stock <= 5 && product.stock > 0 && (
              <div className="absolute top-3 right-3">
                <FloatingBadge tone="neutral">Low stock</FloatingBadge>
              </div>
            )}
          </div>
        </Link>

        <button
          type="button"
          onClick={() => dispatch(toggleWishlist(product))}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={isWishlisted}
          className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:scale-110 active:scale-95 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          <Heart size={16} className={isWishlisted ? 'fill-accent text-accent' : 'text-foreground'} />
        </button>
      </div>

      <Link to={`/product/${product.slug}`} className="block mt-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-caption text-muted capitalize">{product.category}</p>
            <h3 className="text-body font-medium mt-0.5 group-hover:text-accent transition-colors">
              {product.name}
            </h3>
          </div>

          <div className="text-right shrink-0">
            {hasDiscount ? (
              <div>
                <p className="text-caption text-muted line-through">
                  ${product.price.toFixed(0)}
                </p>
                <p className="text-body font-medium text-accent">
                  ${finalPrice.toFixed(0)}
                </p>
              </div>
            ) : (
              <p className="text-body font-medium">${product.price.toFixed(0)}</p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export { ProductCard };
