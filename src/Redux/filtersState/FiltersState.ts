import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TicketState {
  filters: {
    all: boolean;
    noStops: boolean;
    oneStops: boolean;
    twoStops: boolean;
    threeStops: boolean;
  };
  filtersButton: 'cheap' | 'optimal' | 'fast';
  ticketsLength: number;
}

export type FiltersInputState = {
  all: boolean;
  noStops: boolean;
  oneStops: boolean;
  twoStops: boolean;
  threeStops: boolean;
};

type buttonFilters = 'cheap' | 'optimal' | 'fast';

export type FilterInputKeys = keyof FiltersInputState;

const initialState: TicketState = {
  filters: {
    all: false,
    noStops: false,
    oneStops: false,
    twoStops: false,
    threeStops: false,
  },
  filtersButton: 'cheap',
  ticketsLength: 5,
};

const inputFiltersSlice = createSlice({
  name: 'inputFilters',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<FilterInputKeys>) => {
      const filterName = action.payload;
      state.filters[filterName] = !state.filters[filterName];
    },
    setButtonFilter: (state, action: PayloadAction<buttonFilters>) => {
      state.filtersButton = action.payload;
    },
    setLengthTickets: (state, action) => {
      state.ticketsLength += action.payload;
    },
    setAllFilters: (state, action: PayloadAction<boolean>) => {
      state.filters.all = action.payload;
      state.filters.noStops = action.payload;
      state.filters.oneStops = action.payload;
      state.filters.twoStops = action.payload;
      state.filters.threeStops = action.payload;
    },
  },
});
export const { setFilter, setAllFilters, setButtonFilter, setLengthTickets } =
  inputFiltersSlice.actions;

export default inputFiltersSlice.reducer;
