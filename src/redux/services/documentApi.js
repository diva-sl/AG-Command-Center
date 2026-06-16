import { baseApi } from "./baseApi";

export const documentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDocuments: builder.query({
      query: () => ({
        url: "/admin/documents",
        method: "GET",
      }),

      providesTags: ["Documents"],
    }),

    approveDocument: builder.mutation({
      query: (id) => ({
        url: `/admin/documents/${id}/approve`,
        method: "PATCH",
      }),

      invalidatesTags: ["Documents"],
    }),

    rejectDocument: builder.mutation({
      query: (id) => ({
        url: `/admin/documents/${id}/reject`,
        method: "PATCH",
      }),

      invalidatesTags: ["Documents"],
    }),
  }),
});

export const {
  useGetDocumentsQuery,
  useApproveDocumentMutation,
  useRejectDocumentMutation,
} = documentApi;
