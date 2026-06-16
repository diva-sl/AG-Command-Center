import DashboardLayout from "../../components/layout/DashboardLayout";

import RevenueChart from "../../components/charts/RevenueChart";
import UserGrowthChart from "../../components/charts/UserGrowthChart";
import TransactionChart from "../../components/charts/TransactionChart";

import RevenueByPlanChart from "../../components/charts/RevenueByPlanChart";
import TopPlansChart from "../../components/charts/TopPlansChart";
import StoryDownloadsChart from "../../components/charts/StoryDownloadsChart";
import DocumentAnalyticsChart from "../../components/charts/DocumentAnalyticsChart";

import Loader from "../../components/common/Loader";

import {
  IndianRupee,
  Users,
  CreditCard,
  TrendingUp,
  FileText,
  BookOpen,
} from "lucide-react";

import { useGetRevenueAnalyticsQuery } from "../../redux/services/analyticsApi";
import { useGetDashboardQuery } from "../../redux/services/dashboardApi";
import { useGetStoryAnalyticsQuery } from "../../redux/services/successStoryApi";

const Analytics = () => {
  const { data: revenueData = [], isLoading: revenueLoading } =
    useGetRevenueAnalyticsQuery();

  const { data: dashboardData, isLoading: dashboardLoading } =
    useGetDashboardQuery();

  const { data: storyAnalytics, isLoading: storyLoading } =
    useGetStoryAnalyticsQuery();

  const isLoading = revenueLoading || dashboardLoading || storyLoading;

  if (isLoading) {
    return (
      <DashboardLayout>
        {" "}
        <Loader />{" "}
      </DashboardLayout>
    );
  }

  const stats = [
    {
      title: "Total Revenue",
      value: `₹${dashboardData?.stats?.revenue || 0}`,
      icon: IndianRupee,
      color: "bg-green-50",
      iconColor: "text-green-600",
    },

    {
      title: "Total Users",
      value: dashboardData?.stats?.users || 0,
      icon: Users,
      color: "bg-[#511D43]/10",
      iconColor: "text-blue-600",
    },

    {
      title: "Transactions",
      value: dashboardData?.stats?.transactions || 0,
      icon: CreditCard,
      color: "bg-purple-50",
      iconColor: "text-purple-600",
    },

    {
      title: "Documents",
      value: dashboardData?.stats?.documents || 0,
      icon: FileText,
      color: "bg-orange-50",
      iconColor: "text-orange-600",
    },

    {
      title: "Success Stories",
      value: storyAnalytics?.totalStories || 0,
      icon: BookOpen,
      color: "bg-yellow-50",
      iconColor: "text-yellow-600",
    },

    {
      title: "Story Downloads",
      value: storyAnalytics?.totalDownloads || 0,
      icon: TrendingUp,
      color: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
  ];

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-50 -m-6 p-4 md:p-6">
        {/* HERO HEADER */}

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#511D43] via-[#6b2357] to-[#901E3E] p-6 md:p-8 mb-8 shadow-lg">
          <div className="relative z-10 flex flex-col xl:flex-row justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Analytics Center
              </h1>

              <p className="text-white/80 mt-3 max-w-2xl">
                Business Intelligence, Revenue Analytics, User Growth and
                Platform Performance.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 min-w-[250px]">
              <p className="text-white/70 text-sm">Total Revenue</p>

              <h2 className="text-4xl font-bold text-white mt-2">
                ₹{dashboardData?.stats?.revenue || 0}
              </h2>
            </div>
          </div>

          <div className="absolute right-0 top-0 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="
                bg-white
                rounded-3xl
                p-6
                border
                border-[#901E3E]/10
                shadow-sm
                hover:shadow-lg
                hover:-translate-y-1
                transition-all
              "
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-500 text-sm">{item.title}</p>

                    <h2 className="text-3xl font-bold text-[#511D43] mt-3">
                      {item.value}
                    </h2>
                  </div>

                  <div
                    className="
                    w-16 h-16
                    rounded-2xl
                    bg-gradient-to-br
                    from-[#511D43]
                    to-[#901E3E]
                    text-white
                    flex
                    items-center
                    justify-center
                    shadow-lg
                  "
                  >
                    <Icon size={28} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* REVENUE + USER GROWTH */}

        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl border border-[#901E3E]/10 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b bg-[#511D43]/5">
              <h3 className="font-bold text-[#511D43]">Revenue Overview</h3>
            </div>

            <div className="p-4">
              <RevenueChart data={revenueData} />
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-[#901E3E]/10 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b bg-[#511D43]/5">
              <h3 className="font-bold text-[#511D43]">User Growth</h3>
            </div>

            <div className="p-4">
              <UserGrowthChart />
            </div>
          </div>
        </div>

        {/* TRANSACTION */}

        <div className="mt-6 bg-white rounded-3xl border border-[#901E3E]/10 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b bg-[#511D43]/5">
            <h3 className="font-bold text-[#511D43]">Transaction Trends</h3>
          </div>

          <div className="p-4">
            <TransactionChart data={revenueData} />
          </div>
        </div>

        {/* PLAN ANALYTICS */}

        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6 mt-6">
          <div className="bg-white rounded-3xl border border-[#901E3E]/10 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b bg-[#511D43]/5">
              <h3 className="font-bold text-[#511D43]">Revenue By Plan</h3>
            </div>

            <div className="p-4">
              <RevenueByPlanChart />
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-[#901E3E]/10 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b bg-[#511D43]/5">
              <h3 className="font-bold text-[#511D43]">
                Top Subscription Plans
              </h3>
            </div>

            <div className="p-4">
              <TopPlansChart />
            </div>
          </div>
        </div>

        {/* CONTENT ANALYTICS */}

        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6 mt-6">
          <div className="bg-white rounded-3xl border border-[#901E3E]/10 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b bg-[#511D43]/5">
              <h3 className="font-bold text-[#511D43]">Story Downloads</h3>
            </div>

            <div className="p-4">
              <StoryDownloadsChart />
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-[#901E3E]/10 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b bg-[#511D43]/5">
              <h3 className="font-bold text-[#511D43]">Document Analytics</h3>
            </div>

            <div className="p-4">
              <DocumentAnalyticsChart />
            </div>
          </div>
        </div>

        {/* QUICK INSIGHTS */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="bg-white rounded-3xl p-6 border border-[#901E3E]/10 shadow-sm">
            <h3 className="font-bold text-[#511D43] mb-5">Revenue Insights</h3>

            {/* content */}
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#901E3E]/10 shadow-sm">
            <h3 className="font-bold text-[#511D43] mb-5">User Insights</h3>

            {/* content */}
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#901E3E]/10 shadow-sm">
            <h3 className="font-bold text-[#511D43] mb-5">Content Insights</h3>

            {/* content */}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
