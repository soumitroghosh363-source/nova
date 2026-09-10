import { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { SlidersHorizontal } from 'lucide-react'
import { useProducts } from '../hooks/useProducts'
import { useDebounce } from '../hooks/useDebounce'
import { ProductGrid } from '../components/products/ProductGrid'
import { FilterPanel, type Filters } from '../components/filters/FilterPanel'
import { Sheet, SheetHeader, SheetTitle } from '../components/ui/sheet'
import { categories } from '../data/categories'
import type { Product } from '../types/product'

type SortOption = 'featured' | 'price-low' | 'price-high' | 'rating'

const sortProducts = (products: Product[], sort: SortOption): Product[] => {
  const sorted = [...products]
  switch (sort) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price)
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating)
    default:
      return sorted
  }
}

const DEFAULT_MAX_PRICE = 500

const Shop = () => {
 const { category } = useParams<{ category?: string }>()
  const { data: products, isLoading } = useProducts()
  const [searchParams, setSearchParams] = useSearchParams()
  const [filterSheetOpen, setFilterSheetOpen] = useState(false)

  const query = searchParams.get('q') ?? ''
  const sort = (searchParams.get('sort') as SortOption) ?? 'featured'
  const debouncedQuery = useDebounce(query, 300)

  const filters: Filters = {
    categories: searchParams.get('categories')?.split(',').filter(Boolean) ?? [],
    minPrice: Number(searchParams.get('minPrice')) || 0,
    maxPrice: Number(searchParams.get('maxPrice')) || DEFAULT_MAX_PRICE,
    minRating: Number(searchParams.get('minRating')) || 0,
  }

  const activeCategory = categories.find((c) => c.slug === category)

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(key, value)
    else next.delete(key)
    setSearchParams(next, { replace: true })
  }

  const handleFilterChange = (next: Filters) => {
    const params = new URLSearchParams(searchParams)
    next.categories.length
      ? params.set('categories', next.categories.join(','))
      : params.delete('categories')
    params.set('minPrice', String(next.minPrice))
    params.set('maxPrice', String(next.maxPrice))
    next.minRating ? params.set('minRating', String(next.minRating)) : params.delete('minRating')
    setSearchParams(params, { replace: true })
  }

  let filtered = products?.filter((p) => (category ? p.category === category : true)) ?? []

  if (debouncedQuery.trim()) {
    const q = debouncedQuery.trim().toLowerCase()
    filtered = filtered.filter(
      (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    )
  }

  if (filters.categories.length > 0) {
    filtered = filtered.filter((p) => filters.categories.includes(p.category))
  }
  filtered = filtered.filter(
    (p) => p.price >= filters.minPrice && p.price <= filters.maxPrice
  )
  if (filters.minRating > 0) {
    filtered = filtered.filter((p) => p.rating >= filters.minRating)
  }

  filtered = sortProducts(filtered, sort)

  return (
    <div className="px-6 md:px-10 py-16 max-w-7xl mx-auto">
      <h1 className="text-headline mb-2">
        {activeCategory ? activeCategory.name : 'Shop All'}
      </h1>
      <p className="text-body text-muted mb-8">
        {activeCategory?.description ?? 'The full NOVA collection.'}
      </p>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="search"
          value={query}
          onChange={(e) => updateParam('q', e.target.value)}
          placeholder="Search products…"
          aria-label="Search products"
          className="flex-1 px-4 py-3 rounded-clay border border-border bg-background text-body focus:outline-none focus:ring-2 focus:ring-accent"
        />

        <select
          value={sort}
          onChange={(e) => updateParam('sort', e.target.value)}
          aria-label="Sort products"
          className="px-4 py-3 rounded-clay border border-border bg-background text-body focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>

        <button
          type="button"
          onClick={() => setFilterSheetOpen(true)}
          className="lg:hidden flex items-center justify-center gap-2 px-4 py-3 rounded-clay border border-border bg-background text-body"
        >
          <SlidersHorizontal size={16} />
          Filters
        </button>
      </div>

      <div className="flex gap-10">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-56 shrink-0">
          <FilterPanel filters={filters} onChange={handleFilterChange} />
        </aside>

        <div className="flex-1">
          {isLoading ? (
            <p className="text-body text-muted">Loading products…</p>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-body text-muted">
                {query ? `No results for "${query}".` : 'No products match these filters.'}
              </p>
            </div>
          ) : (
            <ProductGrid products={filtered} />
          )}
        </div>
      </div>

      {/* Mobile filter sheet */}
      <Sheet isOpen={filterSheetOpen} onOpenChange={setFilterSheetOpen} side="bottom" className="max-h-[85vh]">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="px-4 pb-4 overflow-y-auto">
          <FilterPanel filters={filters} onChange={handleFilterChange} />
        </div>
      </Sheet>
    </div>
  );
};

export { Shop };
