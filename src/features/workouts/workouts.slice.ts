import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { string } from "yup";
import { api, TPayload } from "@/api/api";
import { TRootState } from "@/store/store";

export interface TSWorkout {
  title: string;
  desc: string;
  category: "push" | "pull" | "legs";
  focuses: Array<string>;
  sets: number;
  reps: number;
  dropset: boolean;
  superSetWith: Array<string>;
  imgUrl: string;
  videoUrl: string;
  likes: Array<string>;
  comments: Array<string>;
  userId: string;
}

export interface TPWorkout extends TSWorkout {
  _id: string;
  likes: Array<string>;
  comments: Array<string>;
  createdAt: Date;
  updatedAT: Date;
}

const workoutAdapter = createEntityAdapter({
  selectId: (item: TPWorkout) => item._id,
});

const initialState = workoutAdapter.getInitialState({
  error: "",
  isWorkoutsLoading: false,
});

const Slice = createSlice({
  name: "workouts",
  initialState,
  reducers: {
    reset: (state) => {
      state = initialState;
    },
    likeWorkout: (state, action: { type: string; payload: TPWorkout }) => {
      workoutAdapter.setOne(state, action.payload);
    },
    dislikeWorkout: (state, action: { type: string; payload: TPWorkout }) => {
      workoutAdapter.setOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    // #region : search
    builder
      .addCase(search.pending, (state) => {
        state.isWorkoutsLoading = true;
      })
      .addCase(search.rejected, (state, action) => {
        state.isWorkoutsLoading = false;
        state.error = action.payload as string;
      })
      .addCase(search.fulfilled, (state, action) => {
        state.isWorkoutsLoading = false;
        state.error = "";
        workoutAdapter.setAll(state, action.payload);
      });

    // #endregion
    // #region : filter
    builder
      .addCase(filter.pending, (state) => {
        state.isWorkoutsLoading = true;
      })
      .addCase(filter.rejected, (state, action) => {
        state.isWorkoutsLoading = false;
        state.error = action.payload as string;
      })
      .addCase(filter.fulfilled, (state, action) => {
        console.log("payload", action.payload);

        console.log("here");
        state.isWorkoutsLoading = false;
        state.error = "";
        workoutAdapter.setAll(state, action.payload);
      });

    // #endregion
  },
});

// pull selectors
export const { selectAll: selectAllWorkouts } = workoutAdapter.getSelectors(
  (state: TRootState) => state.workout
);

export const { selectById: selectOneWorkout } = workoutAdapter.getSelectors(
  (state: TRootState) => state.workout
);

export const { likeWorkout, dislikeWorkout } = Slice.actions;

// export actions
export const {} = Slice.actions;

// exporting reducer
export default Slice.reducer;

// #region : async thunks

// search
export const search = createAsyncThunk(
  "workout/search",
  async (data: { src: string; mine: Boolean | string }, thunkApi) => {
    const { src, mine } = data;

    // mind decides whether to fetch all workouts or my workouts
    const res = await api.get<TPayload<TPWorkout[]>>(
      `/workouts/search?src=${src}&mine=${mine && "true"}`
    );
    console.log("searching");
    if (res.data.statusText === "failure") {
      return thunkApi.rejectWithValue(res.data.message);
    }
    return thunkApi.fulfillWithValue(res.data.payload);
  }
);

// filter
export const filter = createAsyncThunk(
  "workout/filter",
  async (
    data: {
      selectedCategory: string;
      selectedFocuses: string[];
      mine: Boolean | string;
    },
    thunkApi
  ) => {
    const { selectedCategory, selectedFocuses, mine } = data;

    // mind decides whether to fetch all workouts or my workouts
    const res = await api.get<TPayload<TPWorkout[]>>(
      `/workouts?cat=${
        selectedCategory === "All Categories"
          ? ""
          : selectedCategory.toLowerCase()
      }&focuses=${selectedFocuses
        .map((item) => item.toLowerCase())
        .join(",")}&mine=${mine && true}`
    );
    if (res.data.statusText === "failure") {
      return thunkApi.rejectWithValue(res.data.message);
    }
    return thunkApi.fulfillWithValue(res.data.payload);
  }
);

// #endregion
