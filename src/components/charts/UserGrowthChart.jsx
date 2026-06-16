import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { Users } from "lucide-react";

import { useGetUserGrowthAnalyticsQuery } from "../../redux/services/analyticsApi";

const UserGrowthChart = () => {
  const { data = [] } = useGetUserGrowthAnalyticsQuery();

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const chartData = data.map((item) => ({
    month: months[item?._id?.month || item?.month || 0],
    users: item?.users || 0,
  }));

  const totalUsers = chartData.reduce((sum, item) => sum + item.users, 0);

  const highestMonth =
    chartData.length > 0
      ? chartData.reduce((prev, current) =>
          prev.users > current.users ? prev : current,
        )
      : null;

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
              User Growth Analytics
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Monthly user registration trends
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
              flex
              items-center
              justify-center
              text-white
            "
          >
            <Users size={20} />
          </div>
        </div>
      </div>

      {/* Summary Cards */}

      <div className="grid grid-cols-2 gap-4 p-6 pb-0">
        <div className="bg-slate-50 rounded-2xl p-4 text-center">
          <p className="text-sm text-slate-500">Total Registrations</p>

          <h2 className="text-3xl font-bold text-[#511D43] mt-1">
            {totalUsers}
          </h2>
        </div>

        <div className="bg-slate-50 rounded-2xl p-4 text-center">
          <p className="text-sm text-slate-500">Peak Month</p>

          <h2 className="text-2xl font-bold text-[#901E3E] mt-1">
            {highestMonth?.month || "-"}
          </h2>
        </div>
      </div>

      {/* Chart */}

      <div className="p-4 md:p-6">
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 10,
            }}
          >
            <defs>
              <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#901E3E" stopOpacity={0.45} />

                <stop offset="100%" stopColor="#901E3E" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E2E8F0"
            />

            <XAxis
              dataKey="month"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />

            <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />

            <Tooltip
              contentStyle={{
                borderRadius: "14px",
                border: "1px solid #E2E8F0",
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
              }}
            />

            <Area
              type="monotone"
              dataKey="users"
              stroke="#901E3E"
              strokeWidth={3}
              fill="url(#userGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}

      <div className="border-t bg-slate-50 px-6 py-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Months Tracked</span>

          <span className="font-semibold text-[#511D43]">
            {chartData.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserGrowthChart;
