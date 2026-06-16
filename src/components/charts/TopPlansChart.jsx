import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import { Crown } from "lucide-react";

import { useGetTopPlansQuery } from "../../redux/services/analyticsApi";

const colors = ["#511D43", "#901E3E", "#B83280", "#D53F8C", "#ED64A6"];

const TopPlansChart = () => {
  const { data = [] } = useGetTopPlansQuery();

  const chartData = data.map((item) => ({
    name: item._id,
    value: item.count,
  }));

  const totalPurchases = chartData.reduce((acc, item) => acc + item.value, 0);

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
              Top Purchased Plans
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Most popular subscription plans
            </p>
          </div>

          <div
            className="
              w-12
              h-12
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
            <Crown size={20} />
          </div>
        </div>
      </div>

      {/* Stats */}

      <div className="px-6 pt-5">
        <div className="bg-slate-50 rounded-2xl p-4 text-center">
          <p className="text-sm text-slate-500">Total Purchases</p>

          <h2 className="text-3xl font-bold text-[#511D43] mt-1">
            {totalPurchases}
          </h2>
        </div>
      </div>

      {/* Chart */}

      <div className="p-4 md:p-6">
        <ResponsiveContainer width="100%" height={380}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={110}
              innerRadius={55}
              paddingAngle={3}
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
            >
              {chartData.map((_, index) => (
                <Cell key={index} fill={colors[index % colors.length]} />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #eee",
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
              }}
              formatter={(value) => [`${value} Purchases`, "Count"]}
            />

            <Legend
              verticalAlign="bottom"
              height={36}
              wrapperStyle={{
                fontSize: "12px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Top Plans List */}

      <div className="border-t bg-slate-50 p-5">
        <div className="space-y-3">
          {chartData.slice(0, 3).map((plan, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: colors[index % colors.length],
                  }}
                />

                <span className="font-medium text-slate-700">{plan.name}</span>
              </div>

              <span className="font-bold text-[#511D43]">{plan.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopPlansChart;
