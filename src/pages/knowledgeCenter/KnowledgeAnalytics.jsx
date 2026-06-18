import { FileText, Eye, Star, MessageSquare } from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { useGetKnowledgeAnalyticsQuery } from "../../redux/services/knowledgeApi";

import Loader from "../../components/common/Loader";

const COLORS = ["#511D43", "#901E3E", "#B3274E", "#D33B63", "#E85A82"];

const StatCard = ({ title, value, icon: Icon }) => (
  <div
    className="
    bg-white
    rounded-3xl
    border
    p-5
    shadow-sm
  "
  >
    <div className="flex justify-between items-start">
      <div>
        <p className="text-slate-500 text-sm">{title}</p>

        <h3 className="text-3xl font-bold text-[#511D43] mt-2">{value}</h3>
      </div>

      <div
        className="
        w-12
        h-12
        rounded-2xl
        bg-[#901E3E]/10
        flex
        items-center
        justify-center
      "
      >
        <Icon size={22} className="text-[#901E3E]" />
      </div>
    </div>
  </div>
);

const KnowledgeAnalytics = () => {
  const { data, isLoading } = useGetKnowledgeAnalyticsQuery();

  if (isLoading) return <Loader />;

  const analytics = data?.data || {};

  const monthlyData =
    analytics.monthlyArticles?.map((item) => ({
      month: `${item._id.month}/${item._id.year}`,
      count: item.count,
    })) || [];

  const categoryData =
    analytics.categoryStats?.map((item) => ({
      name: item._id,
      value: item.count,
    })) || [];

  return (
    <div className="space-y-6">
      {/* Header */}

      <div
        className="
        bg-gradient-to-r
        from-[#511D43]
        to-[#901E3E]
        rounded-3xl
        p-6
        text-white
      "
      >
        <h2 className="text-2xl md:text-3xl font-bold">Knowledge Analytics</h2>

        <p className="text-white/80 mt-2">
          Monitor article performance, engagement, ratings and community
          activity.
        </p>
      </div>

      {/* KPI Cards */}

      <div
        className="
        grid
        grid-cols-2
        lg:grid-cols-4
        gap-4
      "
      >
        <StatCard
          title="Articles"
          value={analytics.totalPosts || 0}
          icon={FileText}
        />

        <StatCard title="Views" value={analytics.totalViews || 0} icon={Eye} />

        <StatCard
          title="Ratings"
          value={analytics.totalRatings || 0}
          icon={Star}
        />

        <StatCard
          title="Questions"
          value={analytics.totalQuestions || 0}
          icon={MessageSquare}
        />
      </div>

      {/* Charts */}

      <div className="grid xl:grid-cols-2 gap-6">
        {/* Monthly Growth */}

        <div
          className="
          bg-white
          border
          rounded-3xl
          p-6
        "
        >
          <h3 className="font-bold text-lg mb-5">Monthly Article Growth</h3>

          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="count"
                stroke="#901E3E"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Categories */}

        <div
          className="
          bg-white
          border
          rounded-3xl
          p-6
        "
        >
          <h3 className="font-bold text-lg mb-5">Categories Distribution</h3>

          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Articles */}

      <div
        className="
        bg-white
        border
        rounded-3xl
        p-6
      "
      >
        <h3 className="font-bold text-lg mb-5">Top Performing Articles</h3>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b">
                <th className="p-3 text-left">Article</th>

                <th className="p-3 text-left">Views</th>

                <th className="p-3 text-left">Rating</th>

                <th className="p-3 text-left">Helpful</th>
              </tr>
            </thead>

            <tbody>
              {analytics.topArticles?.map((article) => (
                <tr key={article._id} className="border-b">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={article.featuredImage}
                        alt=""
                        className="
                          w-12
                          h-12
                          rounded-lg
                          object-cover
                        "
                      />

                      <div>
                        <h4 className="font-medium">{article.title}</h4>

                        <p className="text-xs text-slate-500">
                          {article?.category?.name}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="p-3">{article.views}</td>

                  <td className="p-3">{article.averageRating}</td>

                  <td className="p-3">{article.helpfulCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Additional Insights */}

      <div
        className="
        grid
        md:grid-cols-2
        xl:grid-cols-4
        gap-4
      "
      >
        <div
          className="
          bg-white
          border
          rounded-3xl
          p-5
        "
        >
          <h4 className="font-semibold mb-3">Avg Rating</h4>

          <div className="text-3xl font-bold text-[#511D43]">
            {analytics.avgRating || 0}
          </div>
        </div>

        <div
          className="
          bg-white
          border
          rounded-3xl
          p-5
        "
        >
          <h4 className="font-semibold mb-3">Helpful Votes</h4>

          <div className="text-3xl font-bold text-[#511D43]">
            {analytics.helpfulVotes || 0}
          </div>
        </div>

        <div
          className="
          bg-white
          border
          rounded-3xl
          p-5
        "
        >
          <h4 className="font-semibold mb-3">Published</h4>

          <div className="text-3xl font-bold text-[#511D43]">
            {analytics.published || 0}
          </div>
        </div>

        <div
          className="
          bg-white
          border
          rounded-3xl
          p-5
        "
        >
          <h4 className="font-semibold mb-3">Drafts</h4>

          <div className="text-3xl font-bold text-[#511D43]">
            {analytics.drafts || 0}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeAnalytics;
