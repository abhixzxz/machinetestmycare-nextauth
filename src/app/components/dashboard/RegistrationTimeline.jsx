import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { ChartCard } from "./ChartCard";

export function RegistrationTimeline({ data }) {
  return (
    <ChartCard
      title="Registration Timeline"
      subtitle="User registration trends over time"
    >
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="users"
          stroke="#0088FE"
          strokeWidth={2}
        />
      </LineChart>
    </ChartCard>
  );
}
