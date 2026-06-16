import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { Download } from "lucide-react";

import { useGetStoryDownloadsAnalyticsQuery } from "../../redux/services/analyticsApi";

const StoryDownloadsChart = () => {
  const { data = [] } = useGetStoryDownloadsAnalyticsQuery();

  const chartData = data.slice(0, 10);

  const totalDownloads = chartData.reduce(
    (acc, item) => acc + (item.downloads || 0),
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
              Story Downloads
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Top downloaded success stories
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
            <Download size={20} />
          </div>
        </div>
      </div>

      {/* Stats */}

      <div className="px-6 pt-5">
        <div className="bg-slate-50 rounded-2xl p-4 text-center">
          <p className="text-sm text-slate-500">Total Downloads</p>

          <h2 className="text-3xl font-bold text-[#511D43] mt-1">
            {totalDownloads.toLocaleString()}
          </h2>
        </div>
      </div>

      {/* Chart */}

      <div className="p-4 md:p-6">
        <ResponsiveContainer width="100%" height={380}>
          <BarChart
            data={chartData}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 50,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

            <XAxis
              dataKey="title"
              interval={0}
              angle={-15}
              textAnchor="end"
              height={80}
              tick={{
                fontSize: 11,
              }}
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
              formatter={(value) => [`${value}`, "Downloads"]}
            />

            <Bar dataKey="downloads" fill="#901E3E" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}

      <div className="px-6 py-4 border-t bg-slate-50">
        <p className="text-xs text-slate-500">
          Showing top 10 downloaded success stories.
        </p>
      </div>
    </div>
  );
};

export default StoryDownloadsChart;
