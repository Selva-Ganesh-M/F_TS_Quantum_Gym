import { TRootState } from "@/store/store";
import { createSlice } from "@reduxjs/toolkit";

export enum ETogglers {
  userMenu = "userMenu",
  homeSidebar = "homeSidebar",
  eventFilterbar = "eventFilterbar",
  workoutFocusFilter = "workoutFocusFilter",
  workoutCatFilter = "workoutCatFilter",
  isSearchOpen = "isSearchOpen",
  isFilterOpen = "isFilterOpen",
}

const togglerSlice = createSlice({
  name: "toggler",
  initialState: {
    userMenu: false,
    homeSidebar: false,
    eventFilterbar: false,
    workoutFocusFilter: false,
    workoutCatFilter: false,
    isSearchOpen: false,
    isFilterOpen: false,
  },
  reducers: {
    toggle: (state, action: { type: string; payload: ETogglers }) => {
      state[action.payload] = !state[action.payload];
    },
    toggleSetTrue: (state, action: { type: string; payload: ETogglers }) => {
      state[action.payload] = true;
    },
    toggleSetFalse: (state, action: { type: string; payload: ETogglers }) => {
      state[action.payload] = false;
    },
  },
  extraReducers: (builder) => {},
});

// pull selectors
export const getToggler = (state: TRootState) => state.toggler;

// export actions
export const { toggle, toggleSetTrue, toggleSetFalse } = togglerSlice.actions;

// exporting reducer
export default togglerSlice.reducer;
