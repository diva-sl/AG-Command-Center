import { baseApi } from "./baseApi";

export const successStoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStories: builder.query({
      query: () => ({
        url: "/admin/success-stories",
      }),
      providesTags: ["Stories"],
    }),

    getStoryById: builder.query({
      query: (id) => ({
        url: `/admin/success-stories/${id}`,
      }),
    }),

    createStory: builder.mutation({
      query: (data) => ({
        url: "/admin/success-stories",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Stories"],
    }),

    updateStory: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/admin/success-stories/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: ["Stories"],
    }),

    deleteStory: builder.mutation({
      query: (id) => ({
        url: `/admin/success-stories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Stories"],
    }),

    toggleFeatureStory: builder.mutation({
      query: (id) => ({
        url: `/admin/success-stories/${id}/feature`,
        method: "PATCH",
      }),
      invalidatesTags: ["Stories"],
    }),

    togglePublishStory: builder.mutation({
      query: (id) => ({
        url: `/admin/success-stories/${id}/publish`,
        method: "PATCH",
      }),
      invalidatesTags: ["Stories"],
    }),

    uploadStoryAssets: builder.mutation({
      query: (formData) => ({
        url: "/admin/success-stories/upload-assets",
        method: "POST",
        data: formData,
      }),
    }),

    getStoryAnalytics: builder.query({
      query: () => ({
        url: "/admin/success-stories/analytics",
      }),

      providesTags: ["Stories"],
    }),
  }),
});

export const {
  useGetStoriesQuery,
  useGetStoryByIdQuery,
  useCreateStoryMutation,
  useUpdateStoryMutation,
  useDeleteStoryMutation,
  useToggleFeatureStoryMutation,
  useTogglePublishStoryMutation,
  useUploadStoryAssetsMutation,
  useGetStoryAnalyticsQuery,
} = successStoryApi;
