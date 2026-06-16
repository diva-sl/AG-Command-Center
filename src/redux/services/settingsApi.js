import { baseApi } from "./baseApi";

export const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSettings: builder.query({
      query: () => ({
        url: "/admin/settings",
      }),
    }),

    updateSettings: builder.mutation({
      query: (data) => ({
        url: "/admin/settings",
        method: "PUT",
        data,
      }),
    }),

    getLegalPage: builder.query({
      query: (page) => ({
        url: `/admin/settings/legal/${page}`,
      }),
    }),

    updateLegalPage: builder.mutation({
      query: ({ page, ...data }) => ({
        url: `/admin/settings/legal/${page}`,
        method: "PUT",
        data,
      }),
    }),
  }),
});

export const {
  useGetSettingsQuery,
  useUpdateSettingsMutation,
  useGetLegalPageQuery,
  useUpdateLegalPageMutation,
} = settingsApi;
