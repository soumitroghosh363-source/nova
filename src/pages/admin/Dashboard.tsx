import { motion } from 'framer-motion'
import { DollarSign, ShoppingBag, Users, Package } from 'lucide-react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { StatCard } from '../../components/admin/StatCard'
import { revenueByMonth, ordersByMonth, revenueByCategory } from '../../data/adminMockData'
import { products } from '../../data/products'
import { useAppSelector } from '../../redux/hooks'

const cardFade = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, delay, ease: 'easeOut' as const },
})

const AdminDashboard = () => {

  const orders = useAppSelector((state) => state.orders.items)
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)
  const lowStockCount = products.filter((p) => p.stock <= 5).length

  return (
     <div className="p-8">
      <motion.h1
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-2xl font-semibold"
      >
        Dashboard
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        className="text-muted mt-1"
      >
        Overview of store performance.
      </motion.p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <StatCard label="Revenue (mock)" value={`$${(6800 + totalRevenue).toLocaleString()}`} change="12% vs last month" trend="up" icon={DollarSign} delay={0.1} />
        <StatCard label="Orders" value={String(57 + orders.length)} change="8% vs last month" trend="up" icon={ShoppingBag} delay={0.15} />
        <StatCard label="Customers" value="312" change="3% vs last month" trend="up" icon={Users} delay={0.2} />
        <StatCard label="Low Stock Items" value={String(lowStockCount)} icon={Package} delay={0.25} />
      </div>

      <div className="grid lg:grid-cols-2 gap-4 mt-6">
        <motion.div {...cardFade(0.3)} className="bg-background border border-border rounded-xl p-5">
          <h2 className="text-sm font-medium mb-4">Revenue, last 6 months</h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={revenueByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E3DACC" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#8A8378" />
              <YAxis tick={{ fontSize: 12 }} stroke="#8A8378" />
              <Tooltip contentStyle={{ borderRadius: 8, borderColor: '#E3DACC', fontSize: 13 }} />
              <Line type="monotone" dataKey="revenue" stroke="#C1441E" strokeWidth={2} dot={false} animationDuration={800} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div {...cardFade(0.35)} className="bg-background border border-border rounded-xl p-5">
          <h2 className="text-sm font-medium mb-4">Orders, last 6 months</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={ordersByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E3DACC" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#8A8378" />
              <YAxis tick={{ fontSize: 12 }} stroke="#8A8378" />
              <Tooltip contentStyle={{ borderRadius: 8, borderColor: '#E3DACC', fontSize: 13 }} />
              <Bar dataKey="orders" fill="#2B2724" radius={[4, 4, 0, 0]} animationDuration={800} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div {...cardFade(0.4)} className="bg-background border border-border rounded-xl p-5 mt-4">
        <h2 className="text-sm font-medium mb-4">Revenue by Category</h2>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={revenueByCategory} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#E3DACC" />
            <XAxis type="number" tick={{ fontSize: 12 }} stroke="#8A8378" />
            <YAxis type="category" dataKey="category" tick={{ fontSize: 12 }} stroke="#8A8378" width={80} />
            <Tooltip contentStyle={{ borderRadius: 8, borderColor: '#E3DACC', fontSize: 13 }} />
            <Bar dataKey="revenue" radius={[0, 4, 4, 0]} animationDuration={800} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export { AdminDashboard };
