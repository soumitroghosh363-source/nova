import { useAppSelector } from '../../redux/hooks'
import { OrdersTable } from '../../components/admin/OrdersTable'

const AdminOrders = () => {

    const orders = useAppSelector((state) => state.orders.items)
  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold">Orders</h1>
      <p className="text-muted mt-1">View and manage customer orders.</p>

      <div className="mt-6">
        <OrdersTable orders={orders} />
      </div>
    </div>
  );
};

export { AdminOrders };

