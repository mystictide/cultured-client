import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "../features/main/mainSlice";

export const store = configureStore({
  reducer: {
    main: mainReducer,
  },
});
