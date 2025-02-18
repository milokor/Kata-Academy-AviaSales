/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import inputFiltersSlice from './filtersState/FiltersState';
import ticketsSlice from './TicketsApiState/ticketSlice';

export const store = configureStore({
  reducer: {
    inputFilters: inputFiltersSlice,
    tickets: ticketsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
