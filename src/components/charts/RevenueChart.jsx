import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const RevenueChart = ({ data }) => {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        p-8
        border
        border-[#511D43]/10
        shadow-lg
      "
    >
      {/* Header */}

      <div className="flex justify-between items-center mb-8">
        <div>
          <p className="text-sm uppercase tracking-wider text-[#901E3E] font-semibold">
            Analytics
          </p>

          <h3 className="font-bold text-2xl text-[#511D43]">
            Revenue Performance
          </h3>

          <p className="text-slate-500 mt-1">
            Monthly subscription revenue insights
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={380}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#511D43" stopOpacity={0.45} />

              <stop offset="95%" stopColor="#901E3E" stopOpacity={0.02} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="4 4" stroke="#E9E2E7" />

          <XAxis
            dataKey="month"
            tick={{
              fill: "#64748b",
              fontSize: 12,
            }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{
              fill: "#64748b",
              fontSize: 12,
            }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            contentStyle={{
              borderRadius: "16px",
              border: "1px solid #E5E7EB",
              background: "#ffffff",
              boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
            }}
          />

          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#511D43"
            strokeWidth={4}
            fill="url(#revenueGradient)"
            dot={{
              r: 5,
              fill: "#901E3E",
              strokeWidth: 0,
            }}
            activeDot={{
              r: 8,
              fill: "#D4AF37",
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
