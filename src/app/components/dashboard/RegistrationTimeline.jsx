// RegistrationTimeline.js
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
import { theme } from "@/app/theme";

export function RegistrationTimeline({ data }) {
  return (
    <ChartCard
      title="Registration Timeline"
      subtitle="User registration trends over time"
    >
      <LineChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={theme.colors.text.secondary}
        />
        <XAxis dataKey="date" stroke={theme.colors.text.primary} />
        <YAxis stroke={theme.colors.text.primary} />
        <Tooltip
          contentStyle={{
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.primary,
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="users"
          stroke={theme.colors.primary}
          strokeWidth={2}
          dot={{ fill: theme.colors.primary }}
          activeDot={{
            r: 8,
            fill: theme.colors.primary,
            strokeWidth: 0,
          }}
        />
      </LineChart>
    </ChartCard>
  );
}
