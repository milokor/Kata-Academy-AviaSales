import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchSearchId, fetchTickets, type Ticket } from './TicketApiState';

interface initialStateTicket {
  tickets: Ticket[];
  progress: number;
  searchId: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: initialStateTicket = {
  tickets: [],
  progress: 0,
  searchId: '',
  isLoading: false,
  error: '',
};

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    addTickets: (state, action: PayloadAction<Ticket[]>) => {
      state.tickets = [...state.tickets, ...action.payload];
    },
    updateProgress: (state, action: PayloadAction<number>) => {
      state.progress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchId.fulfilled, (state, action) => {
        state.searchId = action.payload;
      })
      .addCase(fetchTickets.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tickets = action.payload;
        state.progress = 100;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { updateProgress, addTickets } = ticketsSlice.actions;
export default ticketsSlice.reducer;
