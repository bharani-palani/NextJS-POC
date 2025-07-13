import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    credentials: "include",
    // prepareHeaders: (headers) => {
    //   const token = "abcd";
    //   if (token) {
    //     headers.set("authorization", `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  }), // Replace with your API base URL
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: `/api/users`,
        method: "GET",
        // headers: {
        //   Authorization: "Bearer abcd",
        // },
      }),
    }),
    createUser: builder.mutation({
      query: (newUser) => ({
        url: "/api/user",
        method: "POST",
        body: newUser,
      }),
    }),
    // Add more endpoints as needed
  }),
});

export const { useGetUsersQuery, useCreateUserMutation } = userApi;
