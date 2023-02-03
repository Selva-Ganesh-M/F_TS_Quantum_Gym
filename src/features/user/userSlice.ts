import { api, TPayload } from "@/api/api";
import { TSignup } from "@/routes/base_routes/switchable/SignUp";
import { TRootState } from "@/store/store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface IUserLog {
    fullname: string;
    username: string;
    email: string;
    image: string;
    age: number;
    gender: string;
    token: string;
  }

  const initialState = <IUserLog>{
    fullname: "",
    username: "",
    email: "",
    image: "",
    age: 0,
    gender: "",
    token: ""
};

// #region : async thunk ops

// register
export const register = createAsyncThunk(
  "user/register",
  async (data: TSignup, thunkApi) => {
    try {
      const response = await api.post<TPayload<IUserLog>>("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).catch((err) => {
        throw err;
      });
      //   dev error boundary
      if (response.statusText!=="OK") throw new Error("user register failed");
      const user: IUserLog = response.data.payload;
      return thunkApi.fulfillWithValue(user);
    } catch (err: any) {
      console.log(err.message);
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

//#endregion


const userSlice = createSlice({
  name: "user",
  initialState,
  // reducers
  reducers: {},
  // extra reducers
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

export default userSlice.reducer;
