import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./slices/dashboardSlice";
import companyReducer from "./slices/companySlice";
import developerReducer from "./slices/developerSlice";
import mailReducer from "./slices/mailSlice";

// Configure the Redux store
export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    company: companyReducer,
    developer: developerReducer,
    mailTemplates: mailReducer,
  },
});

// Define RootState type (entire store's state shape)
export type RootState = ReturnType<typeof store.getState>;

// Define AppDispatch type (type of the dispatch function)
export type AppDispatch = typeof store.dispatch;

// Define a reusable selector type alias (optional but convenient)
export type AppSelector<T> = (state: RootState) => T;

// Custom hooks for useDispatch and useSelector
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

// Create typed versions of the hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
