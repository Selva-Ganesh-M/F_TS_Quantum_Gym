import { api, TPayload } from "@/api/api";
import { TRootState } from "@/store/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DataDefaults } from "../comments/comment.slice";

export interface TSUser {
  username: string;
  fullname: string;
  email: string;
  password: string;
  image: string;
  age: number;
  gender: string;
  isGoogleCreated?: Boolean;
}

export interface TPUser extends TSUser, DataDefaults {}

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {} as TPUser,
    error: "",
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      });
  },
});

// pull selectors
export const selectOneUser = (state: TRootState) => state.user.user;

// export actions
export const {} = userSlice.actions;

// exporting reducer
export default userSlice.reducer;

// #region : async-thunk

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (id: string, thunkApi) => {
    const res = await api.get<TPayload<TPUser>>(`/users/${id}`);
    if (res.data.statusText === "success") {
      return thunkApi.fulfillWithValue(res.data.payload);
    }
    return thunkApi.rejectWithValue(res.data.message);
  }
);

// #endregion
