import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { ChartCard } from "./ChartCard";

export function RoleDistributionChart({ data }) {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <ChartCard
      title="User Role Distribution"
      subtitle="Breakdown of users by role"
    >
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ChartCard>
  );
}
