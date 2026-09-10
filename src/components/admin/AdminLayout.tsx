import { Outlet } from "react-router-dom";
import { AdminSidebar } from "./AdminSidebar";

const AdminLayout = () => {
  return (
     <>
      <div className="lg:hidden flex items-center justify-center min-h-screen px-8 text-center">
        <div>
          <p className="text-title font-semibold">Desktop Required</p>
          <p className="text-body text-muted mt-2">
            The NOVA admin dashboard is optimized for larger screens. Please
            switch to a tablet or desktop device.
          </p>
        </div>
      </div>

      <div className="hidden lg:flex h-screen overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto bg-surface/40">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export { AdminLayout };
