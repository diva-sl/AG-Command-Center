import { baseApi } from "./baseApi";

export const planApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /* ================= GET ALL PLANS ================= */

    getPlans: builder.query({
      query: () => ({
        url: "/admin/plans",
      }),
      providesTags: ["Plans"],
    }),

    /* ================= GET PLAN BY ID ================= */

    getPlanById: builder.query({
      query: (id) => ({
        url: `/admin/plans/${id}`,
      }),
      providesTags: ["Plans"],
    }),

    /* ================= CREATE ================= */

    createPlan: builder.mutation({
      query: (data) => ({
        url: "/admin/plans",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Plans"],
    }),

    /* ================= UPDATE ================= */

    updatePlan: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/admin/plans/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: ["Plans"],
    }),

    /* ================= DELETE ================= */

    deletePlan: builder.mutation({
      query: (id) => ({
        url: `/admin/plans/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Plans"],
    }),

    /* ================= ACTIVE / DISABLE ================= */

    togglePlan: builder.mutation({
      query: (id) => ({
        url: `/admin/plans/${id}/toggle`,
        method: "PATCH",
      }),
      invalidatesTags: ["Plans"],
    }),

    /* ================= HIGHLIGHT ================= */

    toggleHighlight: builder.mutation({
      query: (id) => ({
        url: `/admin/plans/${id}/highlight`,
        method: "PATCH",
      }),
      invalidatesTags: ["Plans"],
    }),

    /* ================= ANALYTICS ================= */

    getSubscriptionAnalytics: builder.query({
      query: () => ({
        url: "/admin/plans/analytics",
      }),
      providesTags: ["Plans"],
    }),
  }),
});

export const {
  useGetPlansQuery,
  useGetPlanByIdQuery,

  useCreatePlanMutation,
  useUpdatePlanMutation,
  useDeletePlanMutation,

  useTogglePlanMutation,
  useToggleHighlightMutation,

  useGetSubscriptionAnalyticsQuery,
} = planApi;
