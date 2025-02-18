import { createSelector } from '@reduxjs/toolkit';

export const selectFilters = createSelector(
  (state) => state.inputFilters.filters,
  (filters) => ({
    ...filters,
    all:
      filters.noStops &&
      filters.oneStops &&
      filters.twoStops &&
      filters.threeStops,
  }),
);
