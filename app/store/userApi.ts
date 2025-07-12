import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }), // Replace with your API base URL
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (params) => ({
        url: `/api/users/${params.id}`,
        method: "GET",
      }),
    }),
    createUser: builder.mutation({
      query: (newUser) => ({
        url: "/api/users",
        method: "POST",
        body: newUser,
      }),
    }),
    // Add more endpoints as needed
  }),
});

export const { useGetUsersQuery, useCreateUserMutation } = userApi;
