import { itemVariants } from "@/app/animations";
import { motion } from "framer-motion";

export function StatCard({ title, value, subtitle, icon: Icon }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg shadow-lg p-4 sm:p-6 transition-shadow hover:shadow-xl"
    >
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="text-xs sm:text-sm font-medium text-gray-500">
          {title}
        </h3>
        <motion.div
          whileHover={{ rotate: 15 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Icon className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
        </motion.div>
      </div>

      <div className="flex flex-col items-center text-center">
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="text-xl sm:text-2xl font-bold mb-1"
        >
          {value}
        </motion.span>
        <span className="text-[10px] sm:text-xs text-gray-500 leading-tight">
          {subtitle}
        </span>
      </div>
    </motion.div>
  );
}
