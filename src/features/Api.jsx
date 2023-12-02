import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./constant";

export const Api = createApi({
  reducerPath: "Api",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["API"],
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: (query) => ({
        url: "/getBlogs",
        providesTags: ["API"],
      }),
    }),

    getAllProperties: builder.query({
      query: (query) => ({
        url: "/allProperty",
        providesTags: ["API"],
      }),
    }),

    getBlogsById: builder.query({
      query: (query) => ({
        url: `/blogs/${query}`,
      }),
      providesTags: ["API"],
    }),

    getPropertiesById: builder.query({
      query: (query) => ({
        url: `/propertyById/${query}`,
      }),
      providesTags: ["API"],
    }),

    postCommentByBlogId: builder.mutation({
      query: (query) => ({
        url: `/addBlogComment/${query.id}`,
        body: query.body,
        method: "PATCH",
        headers: {
          Authorization: query.token,
        },
      }),
      providesTags: ["API"],
    }),

    postDetailsandMessages: builder.mutation({
      query: (query) => ({
        url: `/sendMessage`,
        body: query.body,
        method: "POST",
        headers: {
          Authorization: query.token,
        },
      }),
      providesTags: ["API"],
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useGetBlogsByIdQuery,
  useGetAllPropertiesQuery,
  useGetPropertiesByIdQuery,
  usePostCommentByBlogIdMutation,
  usePostDetailsandMessagesMutation
} = Api;
