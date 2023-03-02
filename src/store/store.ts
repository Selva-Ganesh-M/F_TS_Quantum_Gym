import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/user/authSlice";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import homeRoutesSlice from "@/features/routes/homeRoutesSlice";
import togglerSlice from "@/features/togglers/togglerSlice";
import eventSlice from "@/features/events/eventSlice";
import workoutsSlice from "@/features/workouts/workouts.slice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  homeRoute: homeRoutesSlice,
  toggler: togglerSlice,
  events: eventSlice,
  workout: workoutsSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
export const persistor = persistStore(store);

export type TRootState = ReturnType<typeof store.getState>;
export type TStoreDispatch = typeof store.dispatch;
