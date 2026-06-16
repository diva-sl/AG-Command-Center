import { baseApi } from "./baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboard: builder.query({
      query: () => ({
        url: "/admin/dashboard",
        method: "GET",
      }),

      providesTags: ["Dashboard"],
    }),
    recentUsers: builder.query({
      query: () => ({
        url: "/admin/recent-users",
        method: "GET",
      }),
    }),

    recentTransactions: builder.query({
      query: () => ({
        url: "/admin/recent-transactions",
        method: "GET",
      }),
    }),
    getSubscriptionAnalytics: builder.query({
      query: () => ({
        url: "/admin/analytics/subscriptions",
      }),
    }),

    getSubscriptions: builder.query({
      query: () => ({
        url: "/admin/subscriptions",
      }),
    }),
  }),
});

export const {
  useGetDashboardQuery,
  useRecentUsersQuery,
  useRecentTransactionsQuery,
  useGetSubscriptionAnalyticsQuery,
  useGetSubscriptionsQuery,
} = dashboardApi;
