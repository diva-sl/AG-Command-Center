import { baseApi } from "./baseApi";

export const knowledgeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /* ================= CATEGORIES ================= */

    getCategories: builder.query({
      query: () => ({
        url: "/knowledge/categories",
      }),

      providesTags: ["KnowledgeCategory"],
    }),

    createCategory: builder.mutation({
      query: (data) => ({
        url: "/knowledge/categories",
        method: "POST",
        data,
      }),

      invalidatesTags: ["KnowledgeCategory"],
    }),

    updateCategory: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/knowledge/categories/${id}`,
        method: "PUT",
        data,
      }),

      invalidatesTags: ["KnowledgeCategory"],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/knowledge/categories/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["KnowledgeCategory"],
    }),

    /* ================= POSTS ================= */

    getPosts: builder.query({
      query: (params) => ({
        url: "/knowledge",
        params,
      }),

      providesTags: ["KnowledgePost"],
    }),

    getPostById: builder.query({
      query: (id) => ({
        url: `/knowledge/edit/${id}`,
      }),

      providesTags: ["KnowledgePost"],
    }),

    createPost: builder.mutation({
      query: (data) => ({
        url: "/knowledge",
        method: "POST",
        data,
      }),

      invalidatesTags: ["KnowledgePost"],
    }),

    updatePost: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/knowledge/${id}`,
        method: "PUT",
        data,
      }),

      invalidatesTags: ["KnowledgePost"],
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        url: `/knowledge/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["KnowledgePost"],
    }),

    toggleFeatured: builder.mutation({
      query: (id) => ({
        url: `/knowledge/${id}/featured`,
        method: "PATCH",
      }),

      invalidatesTags: ["KnowledgePost"],
    }),

    toggleStatus: builder.mutation({
      query: (id) => ({
        url: `/knowledge/${id}/status`,
        method: "PATCH",
      }),

      invalidatesTags: ["KnowledgePost"],
    }),

    /* ================= PUBLIC ================= */

    getFeaturedPosts: builder.query({
      query: () => ({
        url: "/knowledge/featured",
      }),

      providesTags: ["KnowledgePost"],
    }),

    getTrendingPosts: builder.query({
      query: () => ({
        url: "/knowledge/trending",
      }),

      providesTags: ["KnowledgePost"],
    }),

    /* ================= QUESTIONS ================= */

    getQuestions: builder.query({
      query: () => ({
        url: "/knowledge/questions/all",
      }),

      providesTags: ["KnowledgeQuestion"],
    }),

    approveQuestion: builder.mutation({
      query: (id) => ({
        url: `/knowledge/questions/${id}/approve`,
        method: "PATCH",
      }),

      invalidatesTags: ["KnowledgeQuestion"],
    }),

    answerQuestion: builder.mutation({
      query: ({ id, answer }) => ({
        url: `/knowledge/questions/${id}/answer`,
        method: "PATCH",
        data: { answer },
      }),

      invalidatesTags: ["KnowledgeQuestion"],
    }),

    deleteQuestion: builder.mutation({
      query: (id) => ({
        url: `/knowledge/questions/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["KnowledgeQuestion"],
    }),

    /* ================= ANALYTICS ================= */

    getKnowledgeAnalytics: builder.query({
      query: () => ({
        url: "/knowledge/analytics",
      }),

      providesTags: ["KnowledgeAnalytics"],
    }),

    getTopArticles: builder.query({
      query: () => ({
        url: "/knowledge/analytics/top-articles",
      }),

      providesTags: ["KnowledgeAnalytics"],
    }),

    getCategoryStats: builder.query({
      query: () => ({
        url: "/knowledge/analytics/categories",
      }),

      providesTags: ["KnowledgeAnalytics"],
    }),
  }),
});

export const {
  /* Categories */
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,

  /* Posts */
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,

  /* Actions */
  useToggleFeaturedMutation,
  useToggleStatusMutation,

  /* Public */
  useGetFeaturedPostsQuery,
  useGetTrendingPostsQuery,

  /* Questions */
  useGetQuestionsQuery,
  useApproveQuestionMutation,
  useAnswerQuestionMutation,
  useDeleteQuestionMutation,

  /* Analytics */
  useGetKnowledgeAnalyticsQuery,
  useGetTopArticlesQuery,
  useGetCategoryStatsQuery,
} = knowledgeApi;
