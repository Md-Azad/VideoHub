import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000",
  }),
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => "/videos",
      keepUnusedDataFor: 600,
      providesTags: ["Videos"],
    }),
    getVideo: builder.query({
      query: (id) => `/videos/${id}`,
      providesTags: (result, error, arg) => [{ type: "Video", id: arg }],
    }),
    getRelatedVideo: builder.query({
      query: (title) => {
        const tags = title.split(" ");
        const likes = tags.map((tag) => `title_like=${tag}`);
        const links = `/videos?${likes.join("&")}&_limit=4`;
        return links;
      },
      providesTags: (result, error, arg) => [
        { type: "RelatedVideos", id: arg.id },
      ],
    }),
    addVideo: builder.mutation({
      query: (data) => ({
        url: "/videos",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Videos"],
    }),
    editVideo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/videos/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        "Videos",
        { type: "Video", id: arg.id },
        { type: "RelatedVideos", id: arg.id },
      ],
    }),
    deleteVideo: builder.mutation({
      query: ({ id }) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Videos"],
    }),
  }),
});

export const {
  useGetVideosQuery,
  useGetVideoQuery,
  useGetRelatedVideoQuery,
  useAddVideoMutation,
  useEditVideoMutation,
  useDeleteVideoMutation,
} = apiSlice;
