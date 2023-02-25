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
    loading: false,
    error: "",
  }),
  reducers: {},
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
  },
});

// pull selectors
export const { selectAll: selectAllEvents, selectById } =
  eventsAdapter.getSelectors((state: TRootState) => state.events);

// export actions
export const {} = eventsSlice.actions;

// exporting reducer
export default eventsSlice.reducer;

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

// #endregion
