import { api, TPayload } from "@/api/api";
import { TLogin } from "@/routes/base_routes/switchable/Login";
import { TSignup } from "@/routes/base_routes/switchable/SignUp";
import { TRootState } from "@/store/store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export type TAction<T> = {
  type: any;
  payload: T;
};

interface ISUserLog {
  fullname: string;
  username: string;
  email: string;
  image: string;
  age: number;
  gender: string;
  token: string;
}

interface IPUserLog {
  fullname: string;
  username: string;
  email: string;
  image: string;
  age: number;
  gender: string;
  token: string;
  _id: string;
}

export type TGoogleAuth = {
  fullname: string;
  username: string;
  email: string;
  image: string;
  age: number;
  gender: string;
  isGoogleCreated: Boolean;
};

const initialState = <{ user: IPUserLog; isUser: Boolean }>{
  user: {
    fullname: "",
    username: "",
    email: "",
    image: "",
    age: 0,
    gender: "",
    token: "",
    _id: "",
  },
  isUser: false,
};

// #region : async thunk ops

// register
export const register = createAsyncThunk(
  "auth/register",
  async (data: TSignup, thunkApi) => {
    try {
      const response = await api.post<TPayload<IPUserLog>>(
        "/auth/signup",
        data
      );
      //   dev error boundary
      if (response.data.statusText !== "success") {
        thunkApi.rejectWithValue(response.data.message);
      }
      const user: IPUserLog = response.data.payload;
      console.log(user);
      return thunkApi.fulfillWithValue(user);
    } catch (err: any) {
      console.log(err.message);
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

// login
export const login = createAsyncThunk(
  "auth/login",
  async (data: TLogin, thunkApi) => {
    try {
      const res = await api.post<TPayload<IPUserLog>>("/auth/login", data);
      if (res.data.statusText === "failure") {
        return thunkApi.rejectWithValue(res.data.message);
      }
      return thunkApi.fulfillWithValue(res.data.payload);
    } catch (err: any) {
      console.log(err.message);
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const googleAuth = createAsyncThunk(
  "auth/googleAuth",
  async (data: TGoogleAuth, thunkApi) => {
    try {
      const res = await api.post<TPayload<IPUserLog>>("/auth/google", data);
      if (res.data.statusText === "failure") {
        console.log(res.data.message);
        return thunkApi.rejectWithValue(res.data.message);
      }
      return thunkApi.fulfillWithValue(res.data.payload);
    } catch (error: any) {
      console.log(error.message);

      return thunkApi.rejectWithValue(error.message);
    }
  }
);

//#endregion

const authSlice = createSlice({
  name: "auth",
  initialState,
  // reducers
  reducers: {
    signout: (state) => {
      return initialState;
    },
  },
  // extra reducers
  extraReducers: (builder) => {
    builder
      // register
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isUser = true;
      })
      // login
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isUser = true;
      })
      .addCase(googleAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isUser = true;
      });
  },
});

export const getUser = (state: TRootState) => {
  return state.auth;
};

export const { signout } = authSlice.actions;

export default authSlice.reducer;
