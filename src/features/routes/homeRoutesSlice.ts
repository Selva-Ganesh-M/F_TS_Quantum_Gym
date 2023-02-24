import { TRootState } from "@/store/store";
import { createSlice } from "@reduxjs/toolkit";

export enum EHomeRoutes {
  global = "global",
  events = "events",
  myWorkouts = "my_workouts",
  other = "other",
}

const homeRoutesSlice = createSlice({
  name: "homeRoute",
  initialState: <EHomeRoutes>EHomeRoutes.global,
  reducers: {
    changeHomeRoute: (
      state,
      action: { type: string; payload: EHomeRoutes }
    ) => {
      return action.payload;
    },
  },
});

export const getHomeRoute = (state: TRootState) => state.homeRoute;

export const { changeHomeRoute } = homeRoutesSlice.actions;

export default homeRoutesSlice.reducer;
