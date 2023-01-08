import { TSignup } from "@/routes/base_routes/switchable/SignUp";
import { TRootState } from "@/store/store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/////////////// T and I
interface IUserLog {
  name: string;
  email: string;
  token: string;
}

/////////////// REDUCER FUNCTIONS
const setData = (state: IUserLog, action: { payload: IUserLog }): IUserLog => {
  return action.payload;
};

////////////// ASYNC OPERATIONS

// register
export const register = createAsyncThunk(
  "user/register",
  async (data: TSignup, thunkApi) => {
    try {
      // network error boundary
      const response = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).catch((err) => {
        throw err;
      });
      //   dev error boundary
      if (!response.ok) throw new Error("user register failed");
      const user: IUserLog = await response.json();
      return thunkApi.fulfillWithValue(user);
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

const initialState = <IUserLog>{
  name: "",
  email: "",
  token: "",
};

////////////////  SLICE
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    removeUser: (state) => {
      localStorage.removeItem("user");
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      return action.payload;
    });
  },
});

export const getUser = (state: TRootState): IUserLog => {
  return state.user;
};
export const { removeUser } = userSlice.actions;
export default userSlice.reducer;
