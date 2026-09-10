import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { deleteProduct } from '../../redux/productsAdminSlice'
import { ProductsTable } from '../../components/admin/ProductsTable'

const AdminProducts = () => {

    const dispatch = useAppDispatch()
  const products = useAppSelector((state) => state.productsAdmin.items)

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold">Products</h1>
      <p className="text-muted mt-1">Manage your product catalog.</p>

      <div className="mt-6">
        <ProductsTable products={products} onDelete={(id) => dispatch(deleteProduct(id))} />
      </div>
    </div>
  );
};

export { AdminProducts };
