import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/user/userSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  user: userReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
export const persistor = persistStore(store)

export type TRootState = ReturnType<typeof store.getState>;
export type TStoreDispatch = typeof store.dispatch;
