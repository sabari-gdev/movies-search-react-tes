import { configureStore } from "@reduxjs/toolkit";
import { movieSlice } from "../slice/movieSlice";

export const store = configureStore({
  reducer: {
    movies: movieSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
