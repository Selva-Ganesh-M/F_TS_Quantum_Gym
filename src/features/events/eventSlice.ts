import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { TRootState } from "@/store/store";
import { TPayload } from "@/api/api";
import { TPEvent } from "@/routes/home_routes/switchable/events/EventsPage";
import { api } from "@/api/api";
import { TSEvent } from "@/routes/home_routes/switchable/events/CreateEvent";

// entity adapter creation
const eventsAdapter = createEntityAdapter<TPEvent>({
  selectId: (event) => event._id,
  // sortComparer: (a, b) =>
  //   b.createdAt.toISOString().localeCompare(a.createdAt.toISOString()),
});

const eventsSlice = createSlice({
  name: "events",
  initialState: eventsAdapter.getInitialState({
    loading: true,
    isEnrollingOrWithdrawing: false,
    error: "",
    srcResults: <TPEvent[]>[],
    isSearching: false,
    isDeleting: false,
  }),
  reducers: {
    resetSrc: (state) => {
      state.srcResults = [];
    },
    setLoading: (state) => {
      state.loading = !state.loading;
    },
  },
  extraReducers: (builder) => {
    builder

      // #region : create - event

      .addCase(createEvent.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        eventsAdapter.addOne(state, action.payload);
      })
      // #endregion

      // #region : getAllEvents

      .addCase(getAllEvents.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllEvents.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(getAllEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        eventsAdapter.setAll(state, action.payload);
      });

    // #endregion

    // #region : enroll event
    builder
      .addCase(enrollEvent.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(enrollEvent.fulfilled, (state, action) => {
        eventsAdapter.setOne(state, action.payload);
      });

    // #endregion

    // #region : withdraw event
    builder
      .addCase(withdrawEvent.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(withdrawEvent.fulfilled, (state, action) => {
        eventsAdapter.setOne(state, action.payload);
      });

    // #endregion

    // #region : search events
    builder
      .addCase(searchEvent.pending, (state) => {
        state.isSearching = true;
      })
      .addCase(searchEvent.rejected, (state, action) => {
        state.isSearching = false;
        state.error = action.error as string;
      })
      .addCase(searchEvent.fulfilled, (state, action) => {
        state.isSearching = false;
        state.srcResults = action.payload;
      });

    // #endregion

    // #region : delete event
    builder
      .addCase(deleteEvent.pending, (state) => {
        state.isDeleting = true;
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.isDeleting = false;
        state.error = action.error as string;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.isDeleting = false;
        state.error = "";
        eventsAdapter.removeOne(state, action.payload._id);
      });

    // #endregion
  },
});

// #region : packing

// pull selectors
export const { selectAll: selectAllEvents, selectById } =
  eventsAdapter.getSelectors((state: TRootState) => state.events);

export const getSrcResults = (state: TRootState) => state.events.srcResults;

// export actions
export const { resetSrc, setLoading } = eventsSlice.actions;

// exporting reducer
export default eventsSlice.reducer;

// #endregion

// #region : extra-reducers

// create event
export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (data: TSEvent, thunkApi) => {
    // sending post request
    const res = await api.post<TPayload<TPEvent>>("/events/create", data);
    if (res.data.statusText === "success") {
      return thunkApi.fulfillWithValue(res.data.payload);
    }
    return thunkApi.rejectWithValue(res.data.message);
  }
);

// fetch all events
export const getAllEvents = createAsyncThunk(
  "events/getAllEvents",
  async (_, thunkApi) => {
    // sending get request
    const res = await api.get<TPayload<TPEvent[]>>("/events");

    // validating the response
    if (res.data.statusText === "success") {
      return thunkApi.fulfillWithValue(res.data.payload);
    }
    return thunkApi.rejectWithValue(res.data.message);
  }
);

// enroll event
export const enrollEvent = createAsyncThunk(
  "events/enrollEvent",
  async (eventId: string, thunkApi) => {
    const res = await api.patch<TPayload<TPEvent>>(`/events/enroll/${eventId}`);
    if (res.data.statusText === "failure") {
      return thunkApi.rejectWithValue(res.data.message);
    }
    return thunkApi.fulfillWithValue(res.data.payload);
  }
);

// withdraw event
export const withdrawEvent = createAsyncThunk(
  "events/withdrawEvent",
  async (eventId: string, thunkApi) => {
    const res = await api.patch<TPayload<TPEvent>>(
      `/events/withdraw/${eventId}`
    );
    if (res.data.statusText === "failure") {
      return thunkApi.rejectWithValue(res.data.message);
    }
    return thunkApi.fulfillWithValue(res.data.payload);
  }
);

// search
export const searchEvent = createAsyncThunk(
  "events/searchEvent",
  async (src: string, thunkApi) => {
    const res = await api.get<TPayload<TPEvent[]>>(`/events/search?src=${src}`);
    if (res.data.statusText === "failure") {
      return thunkApi.rejectWithValue(res.data.message);
    }
    return thunkApi.fulfillWithValue(res.data.payload);
  }
);

export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (id: string, thunkApi) => {
    const res = await api.delete<TPayload<TPEvent>>(`/events/delete/${id}`);
    if (res.data.statusText === "success") {
      return thunkApi.fulfillWithValue(res.data.payload);
    }
    return thunkApi.rejectWithValue(res.data.message);
  }
);

// #endregion
