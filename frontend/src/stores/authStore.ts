// Redux store configuration with redux-persist
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

import storage from "redux-persist/lib/storage";
import authReducer from "../auth/authSlice";

// Combine all reducers (only auth for now)
const rootReducer = combineReducers({
  auth: authReducer,
});

// Persist only the auth slice
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

// Wrap root reducer with persistence logic
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create Redux store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

// Types for useSelector and useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
