import { useMemo } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Repeat, ShoppingBag } from "lucide-react";
import { useAppSelector } from "../../redux/hooks";
import { StatCard } from "../../components/admin/StatCard";
import { TopProductsTable } from "../../components/admin/TopProductsTable";
import {
  deriveTopProducts,
  deriveAverageOrderValue,
  deriveRepeatCustomerRate,
} from "../../lib/deriveAnalytics";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { revenueByCategory } from "../../data/adminMockData";

const AdminAnalytics = () => {
  const orders = useAppSelector((state) => state.orders.items);

  const topProducts = useMemo(() => deriveTopProducts(orders), [orders]);
  const aov = useMemo(() => deriveAverageOrderValue(orders), [orders]);
  const repeatRate = useMemo(() => deriveRepeatCustomerRate(orders), [orders]);

  // Baseline AOV/repeat rate for when there isn't enough real order history yet —
  // clearly separate from the real derived numbers above, not blended silently.
  const hasRealData = orders.length > 0;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold">Analytics</h1>
      <p className="text-muted mt-1">Deeper reporting and trends.</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <StatCard
          label="Average Order Value"
          value={hasRealData ? `$${aov.toFixed(0)}` : "$118"}
          icon={ShoppingBag}
          delay={0}
        />
        <StatCard
          label="Repeat Customer Rate"
          value={hasRealData ? `${repeatRate.toFixed(0)}%` : "—"}
          icon={Repeat}
          delay={0.05}
        />
        <StatCard
          label="Total Orders Tracked"
          value={String(orders.length)}
          icon={TrendingUp}
          delay={0.1}
        />
      </div>

      {!hasRealData && (
        <p className="text-xs text-muted mt-3">
          Average Order Value shows a baseline estimate until real orders are
          placed. Repeat Customer Rate and Total Orders reflect real data only.
        </p>
      )}

      <div className="grid lg:grid-cols-2 gap-4 mt-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.15 }}
        >
          <h2 className="text-sm font-medium mb-3">
            Top Products (real order data)
          </h2>
          <TopProductsTable products={topProducts} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.2 }}
          className="bg-background border border-border rounded-xl p-5"
        >
          <h2 className="text-sm font-medium mb-4">
            Revenue by Category (baseline)
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={revenueByCategory} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E3DACC" />
              <XAxis type="number" tick={{ fontSize: 12 }} stroke="#8A8378" />
              <YAxis
                type="category"
                dataKey="category"
                tick={{ fontSize: 12 }}
                stroke="#8A8378"
                width={80}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  borderColor: "#E3DACC",
                  fontSize: 13,
                }}
              />
              <Bar
                dataKey="revenue"
                radius={[0, 4, 4, 0]}
                animationDuration={800}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};

export { AdminAnalytics };
