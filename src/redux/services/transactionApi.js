import { baseApi } from "./baseApi";

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: () => ({
        url: "/admin/transactions",
        method: "GET",
      }),

      providesTags: ["Transactions"],
    }),
    getTransactionById: builder.query({
      query: (id) => ({
        url: `/admin/transactions/${id}`,
        method: "GET",
      }),

      providesTags: ["Transactions"],
    }),
  }),
});

export const { useGetTransactionsQuery, useGetTransactionByIdQuery } =
  transactionApi;
