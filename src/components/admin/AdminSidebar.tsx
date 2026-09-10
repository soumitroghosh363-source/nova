import { motion } from 'framer-motion'
import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Package, ShoppingCart, Users, BarChart3, LogOut } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { logout } from '../../redux/authSlice'

const links = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { to: '/admin/customers', label: 'Customers', icon: Users },
  { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
]

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

const AdminSidebar = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector((state) => state.auth.user)

  const handleSignOut = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <aside className="w-60 shrink-0 border-r border-border bg-background h-screen flex flex-col">
      <div className="px-6 py-5 border-b border-border shrink-0">
        <p className="text-title font-bold">NOVA</p>
        <p className="text-caption text-muted">Admin</p>
      </div>

      <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
        {links.map(({ to, label, icon: Icon, end }, index) => (
          <motion.div
            key={to}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, delay: index * 0.04, ease: 'easeOut' }}
          >
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-body transition-colors ${
                  isActive
                    ? 'bg-foreground text-background font-medium'
                    : 'text-muted hover:bg-surface hover:text-foreground'
                }`
              }
            >
              {({ isActive }) => (
                <motion.span
                  className="flex items-center gap-3 w-full"
                  whileHover={{ x: isActive ? 0 : 2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                >
                  <Icon size={18} />
                  {label}
                </motion.span>
              )}
            </NavLink>
          </motion.div>
        ))}
      </nav>

      {user && (
        <div className="border-t border-border p-3 shrink-0">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-medium shrink-0">
              {initials(user.name)}
            </div>
            <div className="min-w-0">
              <p className="text-caption font-medium truncate">{user.name}</p>
              <p className="text-caption text-muted truncate">{user.email}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-body text-muted hover:bg-surface hover:text-foreground transition-colors mt-1"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      )}
    </aside>
  );
};

export { AdminSidebar };
