import { categories } from "../../data/categories";

export interface Filters {
  categories: string[];
  minPrice: number;
  maxPrice: number;
  minRating: number;
}

interface FilterPanelProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

const FilterPanel = ({ filters, onChange }: FilterPanelProps) => {
  const toggleCategory = (slug: string) => {
    const next = filters.categories.includes(slug)
      ? filters.categories.filter((c) => c !== slug)
      : [...filters.categories, slug];
    onChange({ ...filters, categories: next });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-caption text-muted mb-3">Category</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label
              key={cat.slug}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filters.categories.includes(cat.slug)}
                onChange={() => toggleCategory(cat.slug)}
                className="w-4 h-4 accent-(--color-accent)"
              />
              <span className="text-body">{cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-caption text-muted mb-3">Price</h3>
        <div className="flex items-center gap-3">
          <input
            type="number"
            min={0}
            value={filters.minPrice}
            onChange={(e) =>
              onChange({ ...filters, minPrice: Number(e.target.value) || 0 })
            }
            aria-label="Minimum price"
            className="w-full px-3 py-2 rounded-clay border border-border bg-background text-body focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <span className="text-muted">–</span>
          <input
            type="number"
            min={0}
            value={filters.maxPrice}
            onChange={(e) =>
              onChange({ ...filters, maxPrice: Number(e.target.value) || 0 })
            }
            aria-label="Maximum price"
            className="w-full px-3 py-2 rounded-clay border border-border bg-background text-body focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
      </div>

      <div>
        <h3 className="text-caption text-muted mb-3">Minimum Rating</h3>
        <div className="flex gap-2">
          {[0, 3, 4, 4.5].map((rating) => (
            <button
              key={rating}
              type="button"
              onClick={() => onChange({ ...filters, minRating: rating })}
              className={`px-3 py-1.5 rounded-full text-caption border transition-colors ${
                filters.minRating === rating
                  ? "bg-accent text-accent-foreground border-accent"
                  : "border-border text-muted hover:bg-surface"
              }`}
            >
              {rating === 0 ? "Any" : `${rating}+`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export { FilterPanel };
