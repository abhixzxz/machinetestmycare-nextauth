// ChartCard.js
import { itemVariants } from "@/app/animations";
import { motion } from "framer-motion";
import { ResponsiveContainer } from "recharts";

export function ChartCard({ title, subtitle, children }) {
  return (
    <motion.div
      variants={itemVariants}
      className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="h-80"
      >
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  );
}
