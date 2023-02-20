import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery("http://localhost:8000"),
  tagTypes: ["Posts"],
  endpoints: (builder) => ({}),
});
