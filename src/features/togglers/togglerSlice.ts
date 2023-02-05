import { TRootState } from "@/store/store";
import { createSlice } from "@reduxjs/toolkit";

export enum ETogglers  {
    userMenu="userMenu",
    homeSidebar="homeSidebar"
} 

const togglerSlice = createSlice({
    name: "toggler",
    initialState: {
        userMenu: false,
        homeSidebar: false
    },
    reducers: {
        toggle: (state, action: {type: string, payload:ETogglers})=>{
            state[action.payload]=!state[action.payload]
        }
    },
    extraReducers: (builder)=>{}
})

// pull selectors
export const getToggler = (state: TRootState)=>state.toggler

// export actions
export const {toggle} = togglerSlice.actions

// exporting reducer
export default togglerSlice.reducer