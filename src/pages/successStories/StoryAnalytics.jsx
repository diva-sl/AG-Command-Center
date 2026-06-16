import DashboardLayout from "../../components/layout/DashboardLayout";
import Loader from "../../components/common/Loader";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import {
  BookOpen,
  Eye,
  Download,
  Star,
  FileCheck,
  FileClock,
} from "lucide-react";

import {
  useGetStoryAnalyticsQuery,
  useGetStoriesQuery,
} from "../../redux/services/successStoryApi";

const StoryAnalytics = () => {
  const { data: analytics = {}, isLoading } = useGetStoryAnalyticsQuery();

  const { data: stories = [] } = useGetStoriesQuery();

  if (isLoading) {
    return (
      <DashboardLayout>
        <Loader />
      </DashboardLayout>
    );
  }

  const categoryData = stories.reduce((acc, story) => {
    const existing = acc.find((item) => item.name === story.category);

    if (existing) {
      existing.value += 1;
    } else {
      acc.push({
        name: story.category || "Others",
        value: 1,
      });
    }

    return acc;
  }, []);

  const topViewed = [...stories]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 5)
    .map((item) => ({
      name: item.title,
      views: item.views || 0,
    }));

  const topDownloads = [...stories]
    .sort((a, b) => (b.downloads || 0) - (a.downloads || 0))
    .slice(0, 5)
    .map((item) => ({
      name: item.title,
      downloads: item.downloads || 0,
    }));

  const featuredStories = stories.filter((item) => item.featured).slice(0, 5);

  const stats = [
    {
      title: "Total Stories",
      value: analytics.totalStories || 0,
      icon: BookOpen,
    },

    {
      title: "Published",
      value: analytics.publishedStories || 0,
      icon: FileCheck,
    },

    {
      title: "Draft Stories",
      value: (analytics.totalStories || 0) - (analytics.publishedStories || 0),
      icon: FileClock,
    },

    {
      title: "Featured",
      value: analytics.featuredStories || 0,
      icon: Star,
    },

    {
      title: "Total Views",
      value: analytics.totalViews || 0,
      icon: Eye,
    },

    {
      title: "Downloads",
      value: analytics.totalDownloads || 0,
      icon: Download,
    },
  ];

  const pieColors = [
    "#2563eb",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
  ];
  return (
    <DashboardLayout>
      {/* Back Button */}

      <div className="mb-6">
        <Link
          to="/success-stories"
          className="
      inline-flex
      items-center
      gap-2
      px-4
      py-2
      rounded-xl
      bg-white
      border
      border-[#901E3E]/20
      text-[#511D43]
      shadow-sm
      hover:bg-[#511D43]
      hover:text-white
      transition
    "
        >
          <ArrowLeft size={18} />
          Back to Stories
        </Link>
      </div>

      <div className="min-h-screen bg-slate-50 -m-6 p-4 md:p-6">
        {/* Header */}

        <div className="flex flex-col lg:flex-row justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#511D43]">
              Success Story Analytics
            </h1>

            <p className="text-slate-500 mt-2">
              Performance, engagement and publishing insights.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#901E3E]/10 shadow-sm px-5 py-4">
            <p className="text-sm text-slate-500">Total Engagement</p>

            <h2 className="text-3xl font-bold text-[#901E3E]">
              {(analytics.totalViews || 0) + (analytics.totalDownloads || 0)}
            </h2>
          </div>
        </div>

        {/* Stats */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="
                bg-white
                rounded-3xl
                border
                border-[#901E3E]/10
                shadow-sm
                p-6
                hover:shadow-md
                transition
              "
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-slate-500">{item.title}</p>

                    <h2 className="text-3xl font-bold text-[#511D43] mt-2">
                      {item.value}
                    </h2>
                  </div>

                  <div
                    className="
                    w-14 h-14
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
                    <Icon size={24} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl border border-[#901E3E]/10 shadow-sm p-6">
            <h3 className="text-lg font-bold text-[#511D43] mb-5">
              Story Categories
            </h3>

            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={110}
                  label
                >
                  {categoryData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={pieColors[index % pieColors.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-3xl border border-[#901E3E]/10 shadow-sm p-6">
            <h3 className="text-lg font-bold text-[#511D43] mb-5">
              Most Viewed Stories
            </h3>

            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={topViewed}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis hide dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar dataKey="views" fill="#901E3E" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Downloads */}

        <div className="bg-white rounded-3xl border border-[#901E3E]/10 shadow-sm p-6 mt-6">
          <h3 className="text-lg font-bold text-[#511D43] mb-5">
            Most Downloaded Stories
          </h3>

          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={topDownloads}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="name"
                interval={0}
                angle={-15}
                textAnchor="end"
                height={80}
              />

              <YAxis />

              <Tooltip />

              <Bar dataKey="downloads" fill="#511D43" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Featured Stories */}

        <div className="mt-6">
          <div className="bg-white rounded-3xl border border-[#901E3E]/10 shadow-sm p-6">
            <h3 className="text-lg font-bold text-[#511D43] mb-6">
              Featured Stories
            </h3>

            {featuredStories.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                No featured stories available
              </div>
            ) : (
              <>
                {/* Mobile */}

                <div className="xl:hidden space-y-4">
                  {featuredStories.map((story) => (
                    <div
                      key={story._id}
                      className="
                      border
                      rounded-2xl
                      p-5
                      hover:border-[#901E3E]/30
                    "
                    >
                      <h4 className="font-semibold text-[#511D43]">
                        {story.title}
                      </h4>

                      <p className="text-sm text-slate-500 mt-1">
                        {story.category}
                      </p>

                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <p className="text-xs text-slate-500">Views</p>

                          <p className="font-semibold">{story.views || 0}</p>
                        </div>

                        <div>
                          <p className="text-xs text-slate-500">Downloads</p>

                          <p className="font-semibold">
                            {story.downloads || 0}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            story.status === "published"
                              ? "bg-green-100 text-green-700"
                              : "bg-[#901E3E]/10 text-[#901E3E]"
                          }`}
                        >
                          {story.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop */}

                <div className="hidden xl:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#511D43] text-white">
                      <tr>
                        <th className="text-left px-4 py-4">Story</th>

                        <th className="text-left px-4 py-4">Category</th>

                        <th className="text-left px-4 py-4">Views</th>

                        <th className="text-left px-4 py-4">Downloads</th>

                        <th className="text-left px-4 py-4">Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {featuredStories.map((story) => (
                        <tr
                          key={story._id}
                          className="
                          border-b
                          hover:bg-[#901E3E]/5
                          transition
                        "
                        >
                          <td className="px-4 py-4 font-medium text-[#511D43]">
                            {story.title}
                          </td>

                          <td className="px-4 py-4">{story.category}</td>

                          <td className="px-4 py-4">{story.views || 0}</td>

                          <td className="px-4 py-4">{story.downloads || 0}</td>

                          <td className="px-4 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                story.status === "published"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-[#901E3E]/10 text-[#901E3E]"
                              }`}
                            >
                              {story.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StoryAnalytics;
