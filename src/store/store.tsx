import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { getCardsApi } from "./getCardsApi/getCardsApi";

export const store = configureStore({
  reducer: {
    [getCardsApi.reducerPath]: getCardsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(getCardsApi.middleware),
});

setupListeners(store.dispatch);
