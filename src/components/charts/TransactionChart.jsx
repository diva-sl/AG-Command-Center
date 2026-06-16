import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import { CreditCard } from "lucide-react";

const TransactionChart = ({ data = [] }) => {
  const totalTransactions = data.reduce(
    (sum, item) => sum + (item.count || 0),
    0,
  );

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
              Transaction Trends
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Monthly transaction activity overview
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
            <CreditCard size={20} />
          </div>
        </div>
      </div>

      {/* Summary */}

      <div className="px-6 pt-5">
        <div className="bg-slate-50 rounded-2xl p-4 text-center">
          <p className="text-sm text-slate-500">Total Transactions</p>

          <h2 className="text-3xl font-bold text-[#511D43] mt-1">
            {totalTransactions}
          </h2>
        </div>
      </div>

      {/* Chart */}

      <div className="p-4 md:p-6">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 10,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E2E8F0"
            />

            <XAxis
              dataKey="month"
              tick={{
                fontSize: 12,
              }}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              tick={{
                fontSize: 12,
              }}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              cursor={{
                fill: "#f8fafc",
              }}
              contentStyle={{
                borderRadius: "14px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
              }}
            />

            <Bar
              dataKey="count"
              name="Transactions"
              radius={[10, 10, 0, 0]}
              fill="#901E3E"
              maxBarSize={55}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Stats */}

      <div className="border-t bg-slate-50 px-6 py-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Months Tracked</span>

          <span className="font-semibold text-[#511D43]">{data.length}</span>
        </div>
      </div>
    </div>
  );
};

export default TransactionChart;
