import { useMemo } from "react";
import { useAppSelector } from "../../redux/hooks";
import { deriveCustomers } from "../../lib/deriveCustomers";
import { CustomersTable } from "../../components/admin/CustomersTable";

const AdminCustomers = () => {
  const orders = useAppSelector((state) => state.orders.items);
  const customers = useMemo(() => deriveCustomers(orders), [orders]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold">Customers</h1>
      <p className="text-muted mt-1">Customer accounts and activity.</p>

      <div className="mt-6">
        <CustomersTable customers={customers} />
      </div>
    </div>
  );
};

export { AdminCustomers };
