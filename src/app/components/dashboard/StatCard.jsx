import { LucideIcon } from "lucide-react";

export function StatCard({ title, value, subtitle, icon: Icon }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <Icon className="h-4 w-4 text-gray-500" />
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold">{value}</span>
        <span className="text-xs text-gray-500">{subtitle}</span>
      </div>
    </div>
  );
}
