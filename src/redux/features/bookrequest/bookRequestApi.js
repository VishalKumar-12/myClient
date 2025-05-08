// src/features/api/bookRequestApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseURL";

const bookRequestApi = createApi({
  reducerPath: 'bookRequestApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/bookrequests`,
    credentials: 'include'
  }),
  tagTypes: ['BookRequests'],
  endpoints: (builder) => ({
    createBookRequest: builder.mutation({
      query: (newRequest) => ({
        url: '/',
        method: 'POST',
        body: newRequest,
        credentials: 'include',
      }),
      invalidatesTags: ['BookRequests']
    }),

    getBookRequestsByEmail: builder.query({
      query: (email) => `/email/${email}`,
      providesTags: ['BookRequests']
    }),

    getAllBookRequests: builder.query({
      query: () => '/',
      providesTags: ['BookRequests']
    })
  })
});

export const {
  useCreateBookRequestMutation,
  useGetBookRequestsByEmailQuery,
  useGetAllBookRequestsQuery
} = bookRequestApi;

export default bookRequestApi;
