import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { IndianRupee } from "lucide-react";

import { useGetRevenueByPlanQuery } from "../../redux/services/analyticsApi";

const RevenueByPlanChart = () => {
  const { data = [] } = useGetRevenueByPlanQuery();

  const chartData = data.map((item) => ({
    plan: item._id,
    revenue: item.revenue,
  }));

  const totalRevenue = chartData.reduce((acc, item) => acc + item.revenue, 0);

  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        border-[#901E3E]/10
        shadow-sm
        overflow-hidden
      "
    >
      {/* Header */}

      <div
        className="
          px-6
          py-4
          border-b
          bg-gradient-to-r
          from-[#511D43]/5
          to-[#901E3E]/5
        "
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg text-[#511D43]">
              Revenue By Plan
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Revenue generated from subscription plans
            </p>
          </div>

          <div
            className="
              w-12 h-12
              rounded-2xl
              bg-gradient-to-br
              from-[#511D43]
              to-[#901E3E]
              text-white
              flex
              items-center
              justify-center
            "
          >
            <IndianRupee size={20} />
          </div>
        </div>
      </div>

      {/* Summary */}

      <div className="px-6 pt-5">
        <div className="bg-slate-50 rounded-2xl p-4 text-center">
          <p className="text-sm text-slate-500">Total Revenue</p>

          <h2 className="text-3xl font-bold text-[#511D43] mt-1">
            ₹{totalRevenue.toLocaleString()}
          </h2>
        </div>
      </div>

      {/* Chart */}

      <div className="p-4 md:p-6">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={chartData}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

            <XAxis
              dataKey="plan"
              tick={{
                fontSize: 12,
              }}
              interval={0}
            />

            <YAxis
              tick={{
                fontSize: 12,
              }}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #eee",
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
              }}
              formatter={(value) => [
                `₹${Number(value).toLocaleString()}`,
                "Revenue",
              ]}
            />

            <Bar dataKey="revenue" radius={[10, 10, 0, 0]} fill="#511D43" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueByPlanChart;
