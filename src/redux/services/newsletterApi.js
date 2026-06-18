import { baseApi } from "./baseApi";

export const newsletterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubscribers: builder.query({
      query: () => ({
        url: "/newsletter/admin/subscribers",
        method: "GET",
      }),
      providesTags: ["Newsletter"],
    }),

    getNewsletterStats: builder.query({
      query: () => ({
        url: "/newsletter/admin/stats",
        method: "GET",
      }),
      providesTags: ["Newsletter"],
    }),

    deleteSubscriber: builder.mutation({
      query: (id) => ({
        url: `/newsletter/admin/subscribers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Newsletter"],
    }),

    subscribeNewsletter: builder.mutation({
      query: (data) => ({
        url: "/newsletter/subscribe",
        method: "POST",
        data,
      }),
    }),
  }),
});

export const {
  useGetSubscribersQuery,
  useGetNewsletterStatsQuery,
  useDeleteSubscriberMutation,
  useSubscribeNewsletterMutation,
} = newsletterApi;
