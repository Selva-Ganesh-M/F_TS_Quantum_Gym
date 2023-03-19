import { api, TPayload } from "@/api/api";
import { TRootState } from "@/store/store";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityAdapter,
} from "@reduxjs/toolkit";

export interface DataDefaults {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TSComment {
  userId: string;
  workoutId: string;
  content: string;
  likes: string[];
}

export interface TPComment extends TSComment, DataDefaults {}

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: [] as TPComment[],
    error: "",
    isLoading: false,
    isDeleting: false,
    isUpdating: false,
    isCreating: false,
  },
  reducers: {
    setAll: (state, action) => {
      state.comments = action.payload;
    },
    resetAll: (state) => {
      state.comments = [];
    },
    deleteOne: (state, action: { type: string; payload: string }) => {
      state.comments.filter((item) => item._id !== action.payload);
    },
    addOne: (state, action: { type: string; payload: TPComment }) => {
      state.comments.push(action.payload);
    },
    updateOne: (state, action: { type: string; payload: TPComment }) => {
      state.comments.map((item) => {
        if (item._id === action.payload._id) {
          return action.payload;
        }
        return item;
      });
    },
  },
  extraReducers: (builder) => {
    // #region : fetch all workouts
    builder
      .addCase(fetchAllComments.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllComments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAllComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = action.payload;
      });

    // #endregion

    // #region : delete single workout
    builder
      .addCase(deleteComment.pending, (state, action) => {
        state.isDeleting = true;
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.isDeleting = false;
        state.error = action.payload as string;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.isDeleting = false;
        state.comments = state.comments.filter(
          (item) => item._id !== action.payload._id
        );
      });

    // #endregion

    // #region : update single workout
    builder
      .addCase(updateComment.pending, (state, action) => {
        state.isUpdating = true;
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload as string;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.comments = state.comments.map((item) => {
          if (item._id === action.payload._id) {
            return action.payload;
          }
          return item;
        });
      });

    // #endregion

    // #region : create single workout
    builder
      .addCase(createComment.pending, (state, action) => {
        state.isCreating = true;
      })
      .addCase(createComment.rejected, (state, action) => {
        state.isCreating = false;
        state.error = action.payload as string;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.isCreating = false;
        state.comments.unshift(action.payload);
      });

    // #endregion
  },
});

// pull selectors
export const selectAllComments = (state: TRootState) => state.comment.comments;
export const selectOneComment = (state: TRootState, id: string) =>
  state.comment.comments.find((item) => item._id === id);

// export actions
export const { setAll, deleteOne, resetAll, addOne, updateOne } =
  commentSlice.actions;

// exporting reducer
export default commentSlice.reducer;

// async thunks

// fetch all comments
export const fetchAllComments = createAsyncThunk(
  "comment/fetchAllComments",
  async (id: string, thunkApi) => {
    const res = await api.get<TPayload<TPComment[]>>(`/wComments/${id}`);
    if (res.data.statusText === "success") {
      return thunkApi.fulfillWithValue(res.data.payload);
    }
    return thunkApi.rejectWithValue(res.data.message);
  }
);

// delete comments
export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (id: string, thunkApi) => {
    const res = await api.delete<TPayload<TPComment>>(
      `/wComments/delete/${id}`
    );
    if (res.data.statusText === "success") {
      return thunkApi.fulfillWithValue(res.data.payload);
    }
    return thunkApi.rejectWithValue(res.data.message);
  }
);

// update comment
export const updateComment = createAsyncThunk(
  "comments/updateComment",
  async (data: { id: string; content: string }, thunkApi) => {
    const { id, content } = data;
    const res = await api.patch<TPayload<TPComment>>(
      `/wComments/update/${id}`,
      { content: content }
    );
    if (res.data.statusText === "success") {
      return thunkApi.fulfillWithValue(res.data.payload);
    }
    return thunkApi.rejectWithValue(res.data.message);
  }
);

// create comment
export const createComment = createAsyncThunk(
  "comments/createComment",
  async (comment: TSComment, thunkApi) => {
    const res = await api.post<TPayload<TPComment>>(
      `/wComments/create`,
      comment
    );
    if (res.data.statusText === "success") {
      return thunkApi.fulfillWithValue(res.data.payload);
    }
    return thunkApi.rejectWithValue(res.data.message);
  }
);
