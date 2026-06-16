import { baseApi } from "./baseApi";

export const analyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRevenueAnalytics: builder.query({
      query: () => ({
        url: "/admin/analytics/revenue",
      }),
    }),

    getRevenueByPlan: builder.query({
      query: () => ({
        url: "/admin/analytics/revenue-plan",
      }),
    }),

    getUserGrowthAnalytics: builder.query({
      query: () => ({
        url: "/admin/analytics/user-growth",
      }),
    }),

    getStoryDownloadsAnalytics: builder.query({
      query: () => ({
        url: "/admin/analytics/story-downloads",
      }),
    }),

    getTopPlans: builder.query({
      query: () => ({
        url: "/admin/analytics/top-plans",
      }),
    }),

    getDocumentAnalytics: builder.query({
      query: () => ({
        url: "/admin/analytics/documents",
      }),
    }),
  }),
});

export const {
  useGetRevenueAnalyticsQuery,
  useGetRevenueByPlanQuery,
  useGetUserGrowthAnalyticsQuery,
  useGetStoryDownloadsAnalyticsQuery,
  useGetTopPlansQuery,
  useGetDocumentAnalyticsQuery,
} = analyticsApi;
