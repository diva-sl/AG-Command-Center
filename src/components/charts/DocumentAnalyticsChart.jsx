import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import { FileText } from "lucide-react";

import { useGetDocumentAnalyticsQuery } from "../../redux/services/analyticsApi";

const colors = [
  "#511D43",
  "#901E3E",
  "#16a34a",
  "#2563eb",
  "#f59e0b",
  "#dc2626",
];

const DocumentAnalyticsChart = () => {
  const { data = [] } = useGetDocumentAnalyticsQuery();

  const chartData = data.map((item) => ({
    name: item._id,
    value: item.total,
  }));

  const totalDocuments = chartData.reduce((acc, item) => acc + item.value, 0);

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
              Document Analytics
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Document status distribution
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
            <FileText size={20} />
          </div>
        </div>
      </div>

      {/* Stats */}

      <div className="px-6 pt-5">
        <div
          className="
            bg-slate-50
            rounded-2xl
            p-4
            text-center
          "
        >
          <p className="text-sm text-slate-500">Total Documents</p>

          <h2 className="text-3xl font-bold text-[#511D43] mt-1">
            {totalDocuments}
          </h2>
        </div>
      </div>

      {/* Chart */}

      <div className="p-4 md:p-6">
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={3}
            >
              {chartData.map((_, index) => (
                <Cell key={index} fill={colors[index % colors.length]} />
              ))}
            </Pie>

            <Tooltip />

            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DocumentAnalyticsChart;
