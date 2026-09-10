import { useParams, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { upsertProduct } from "../../redux/productsAdminSlice";
import { ProductForm } from "../../components/admin/ProductForm";

const ProductEditor = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.productsAdmin.items);

  const isEditing = !!id;
  const existingProduct = isEditing
    ? products.find((p) => p.id === id)
    : undefined;

  if (isEditing && !existingProduct) {
    return <Navigate to="/admin/products" replace />;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold">
        {isEditing ? `Edit ${existingProduct?.name}` : "Add Product"}
      </h1>
      <p className="text-muted mt-1">
        {isEditing
          ? "Update product details."
          : "Create a new product in your catalog."}
      </p>

      <div className="mt-6">
        <ProductForm
          initialProduct={existingProduct}
          onSave={(product) => dispatch(upsertProduct(product))}
        />
      </div>
    </div>
  );
};

export { ProductEditor };
