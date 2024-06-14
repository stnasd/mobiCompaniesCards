import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IRepoEntry, PropsQuery } from "../types";

export const getCardsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://devapp.bonusmoney.pro/mobileapp",
    prepareHeaders: (headers) => {
      headers.set("TOKEN", "123");
      return headers;
    },
  }),
  endpoints: (build) => ({
    getCards: build.mutation<IRepoEntry, PropsQuery>({
      query: ({ offset, limit }) => ({
        url: "/getAllCompanies",
        method: "POST",
        body: { offset, limit },
      }),
    }),
  }),
});

export const { useGetCardsMutation } = getCardsApi;
