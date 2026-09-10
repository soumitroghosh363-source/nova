import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../types/product";
import { categories } from "../../data/categories";

const productSchema = z.object({
  name: z.string().min(2, 'Enter a product name'),
  description: z.string().min(10, 'Description should be at least 10 characters'),
  category: z.string().min(1, 'Select a category'),
  price: z.coerce.number().positive('Price must be greater than 0'),
  discount: z.coerce.number().min(0).max(100).optional(),
  stock: z.coerce.number().int().min(0, 'Stock cannot be negative'),
  sku: z.string().min(3, 'Enter a valid SKU'),
})

type ProductFormInput = z.input<typeof productSchema>
type ProductFormOutput = z.output<typeof productSchema>

interface ProductFormProps {
  initialProduct?: Product;
  onSave: (product: Product) => void;
}

const slugify = (name: string) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const ProductForm = ({ initialProduct, onSave }: ProductFormProps) => {
 const navigate = useNavigate()
  const isEditing = !!initialProduct

 const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<ProductFormInput, unknown, ProductFormOutput>({
  resolver: zodResolver(productSchema),
  defaultValues: initialProduct
    ? {
        name: initialProduct.name,
        description: initialProduct.description,
        category: initialProduct.category,
        price: initialProduct.price,
        discount: initialProduct.discount ?? 0,
        stock: initialProduct.stock,
        sku: initialProduct.sku,
      }
    : { discount: 0, stock: 0 },
})

  const onSubmit = (data: ProductFormOutput) => {
    const product: Product = {
    id: initialProduct?.id ?? crypto.randomUUID(),
    slug: initialProduct?.slug ?? slugify(data.name),
    name: data.name,
    description: data.description,
    category: data.category,
    price: data.price,
    discount: data.discount || undefined,
    images: initialProduct?.images ?? ['nova-placeholder'],
    rating: initialProduct?.rating ?? 0,
    reviewCount: initialProduct?.reviewCount ?? 0,
    stock: data.stock,
    sku: data.sku,
    variants: initialProduct?.variants,
    featured: initialProduct?.featured,
  }
  onSave(product)
  navigate('/admin/products')
  }

  const inputClass =
    'w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent'
  const labelClass = 'text-xs font-medium text-muted block mb-1.5'
  const errorClass = 'text-xs text-red-500 mt-1'

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-5">
      <div>
        <label htmlFor="name" className={labelClass}>Product Name</label>
        <input id="name" type="text" {...register('name')} className={inputClass} />
        {errors.name && <p className={errorClass}>{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="description" className={labelClass}>Description</label>
        <textarea
          id="description"
          rows={3}
          {...register('description')}
          className={inputClass}
        />
        {errors.description && <p className={errorClass}>{errors.description.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="category" className={labelClass}>Category</label>
          <select id="category" {...register('category')} className={inputClass}>
            <option value="">Select category…</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
          {errors.category && <p className={errorClass}>{errors.category.message}</p>}
        </div>

        <div>
          <label htmlFor="sku" className={labelClass}>SKU</label>
          <input id="sku" type="text" {...register('sku')} className={inputClass} />
          {errors.sku && <p className={errorClass}>{errors.sku.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label htmlFor="price" className={labelClass}>Price ($)</label>
          <input id="price" type="number" step="0.01" {...register('price')} className={inputClass} />
          {errors.price && <p className={errorClass}>{errors.price.message}</p>}
        </div>

        <div>
          <label htmlFor="discount" className={labelClass}>Discount (%)</label>
          <input id="discount" type="number" {...register('discount')} className={inputClass} />
          {errors.discount && <p className={errorClass}>{errors.discount.message}</p>}
        </div>

        <div>
          <label htmlFor="stock" className={labelClass}>Stock</label>
          <input id="stock" type="number" {...register('stock')} className={inputClass} />
          {errors.stock && <p className={errorClass}>{errors.stock.message}</p>}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={() => navigate('/admin/products')}
          className="px-4 py-2 rounded-lg border border-border text-sm hover:bg-surface transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors"
        >
          {isEditing ? 'Save Changes' : 'Create Product'}
        </button>
      </div>
    </form>
  );
};

export { ProductForm };
