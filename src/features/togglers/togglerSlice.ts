import { TRootState } from "@/store/store";
import { createSlice } from "@reduxjs/toolkit";

export enum ETogglers {
  userMenu = "userMenu",
  homeSidebar = "homeSidebar",
  eventFilterbar = "eventFilterbar",
}

const togglerSlice = createSlice({
  name: "toggler",
  initialState: {
    userMenu: false,
    homeSidebar: false,
    eventFilterbar: false,
  },
  reducers: {
    toggle: (state, action: { type: string; payload: ETogglers }) => {
      Object.keys(state).forEach((item: string) => {
        if (item === action.payload) {
          return state[item];
        } else {
          return (state[item as ETogglers] = false);
        }
      });
      state[action.payload] = !state[action.payload];
      console.log("ef", state.eventFilterbar);
      console.log("user", state.userMenu);
      console.log("side", state.homeSidebar);
    },
  },
  extraReducers: (builder) => {},
});

// pull selectors
export const getToggler = (state: TRootState) => state.toggler;

// export actions
export const { toggle } = togglerSlice.actions;

// exporting reducer
export default togglerSlice.reducer;
