import { createSelector } from '@reduxjs/toolkit';
import type { Ticket } from '../TicketsApiState/TicketApiState';

export const selectFilterToggle = createSelector(
  [
    (state) => state.tickets.tickets,
    (state) => state.inputFilters.filters,
    (state) => state.inputFilters.filtersButton,
    (state) => state.inputFilters.ticketsLength,
  ],
  (tickets, filters, buttonFilters, length) => {
    const copyTickets = [...tickets.slice(0, length)];
    let result = [];

    if (filters.noStops) {
      result = copyTickets.filter((a: Ticket) =>
        a.segments.some((s) => s.stops.length === 0),
      );
    }

    if (filters.oneStops) {
      result = copyTickets.filter((a: Ticket) =>
        a.segments.some((s) => s.stops.length === 1),
      );
    }

    if (filters.twoStops) {
      result = copyTickets.filter((a: Ticket) =>
        a.segments.some((s) => s.stops.length === 2),
      );
    }

    if (filters.threeStops) {
      result = copyTickets.filter((a: Ticket) =>
        a.segments.some((s) => s.stops.length === 3),
      );
    }

    if (buttonFilters === 'cheap') {
      result = result.sort((a, b) => a.price - b.price);
    }

    if (buttonFilters === 'fast') {
      result = result.sort((a: Ticket, b) => {
        const durationA = a.segments[0].duration;
        const durationB = b.segments[0].duration;
        return durationA - durationB;
      });
    }

    if (buttonFilters === 'optimal') {
      result = result.sort((a: Ticket, b: Ticket) => {
        const durationA = a.segments[0].duration;
        const durationB = b.segments[0].duration;
        return a.price + durationA - (b.price + durationB);
      });
    }
    return result;
  },
);
