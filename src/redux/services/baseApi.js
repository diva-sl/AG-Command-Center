import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const baseApi = createApi({
  reducerPath: "api",

  baseQuery: axiosBaseQuery({
    baseUrl:
      import.meta.env.MODE === "production"
        ? "https://api.agandassociates.org/api"
        : "http://localhost:5001/api",
  }),

  tagTypes: [
    "Dashboard",
    "Users",
    "Transactions",
    "Documents",
    "Plans",
    "Analytics",
    "Settings",
    "Stories",
    "StoryAnalytics",
    "KnowledgePost",
    "KnowledgeCategory",
    "KnowledgeQuestion",
    "KnowledgeAnalytics",
    "Newsletter",
  ],

  endpoints: () => ({}),
});
