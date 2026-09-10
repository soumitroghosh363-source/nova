import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface StatCardProps {
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down";
  icon: LucideIcon;
  delay?: number;
}

const StatCard = ({
  label,
  value,
  change,
  trend,
  icon: Icon,
  delay = 0,
}: StatCardProps) => {
  return (
     <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: 'easeOut' }}
      whileHover={{ y: -2 }}
      className="group bg-background border border-border rounded-xl p-5 transition-shadow hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted transition-colors duration-200 group-hover:text-accent">
          {label}
        </p>
        <motion.div
          whileHover={{ rotate: 12, scale: 1.1 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="text-muted transition-[color,filter] duration-200 group-hover:text-accent group-hover:drop-shadow-[0_0_6px_rgba(193,68,30,0.5)]"
        >
          <Icon size={18} />
        </motion.div>
      </div>
      <motion.p
        key={value}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-2xl font-semibold mt-2"
      >
        {value}
      </motion.p>
      {change && (
        <p className={`text-xs mt-1 ${trend === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>
          {trend === 'up' ? '↑' : '↓'} {change}
        </p>
      )}
    </motion.div>
  );
};

export { StatCard };
