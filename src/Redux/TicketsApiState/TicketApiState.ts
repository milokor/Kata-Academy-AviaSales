/* eslint-disable no-continue */
/* eslint-disable no-constant-condition */
/* eslint-disable no-await-in-loop */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { updateProgress, addTickets } from './ticketSlice';

export interface Ticket {
  price: number;
  carrier: string;
  segments: [
    {
      origin: string;
      destination: string;
      date: string;
      stops: string[];
      duration: number;
    },
    {
      origin: string;
      destination: string;
      date: string;
      stops: string[];
      duration: number;
    },
  ];
}

const API_URL = 'https://aviasales-test-api.kata.academy';
const TARGET_TICKETS = 10200;
export const fetchSearchId = createAsyncThunk<string>(
  'tickets/fetchSearchId',
  async (_, { rejectWithValue }) => {
    const controller = new AbortController();
    const { signal } = controller;
    try {
      const response = await axios.get(`${API_URL}/search`, {
        signal,
      });
      return response.data.searchId;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }
      return error;
    }
  },
);

export const fetchTickets = createAsyncThunk<Ticket[], string>(
  'tickets/fetchTickets',
  async (searchId, { rejectWithValue, dispatch }) => {
    let allTickets: Ticket[] = [];
    let receivedTickets = 0;
    let flag = false;
    const delay = 500;
    const fetchWithDelay = async (): Promise<void> =>
      new Promise<void>((resolve) => {
        setTimeout(resolve, delay);
      });
    const controller = new AbortController();
    const { signal } = controller;
    while (receivedTickets < TARGET_TICKETS) {
      try {
        const response = await axios.get(
          `${API_URL}/tickets?searchId=${searchId}`,
          { signal },
        );
        allTickets = [...allTickets, ...response.data.tickets];
        receivedTickets += response.data.tickets.length;
        if (allTickets.length >= 500 && !flag) {
          flag = true;
          dispatch(addTickets(allTickets));
          allTickets = [];
        }

        const progress = Math.min(
          (receivedTickets / TARGET_TICKETS) * 100,
          100,
        );

        dispatch(updateProgress(progress));

        if (response.data.stop) break;
        await fetchWithDelay();
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 500) {
            continue;
          }
          return rejectWithValue(error.message);
        }
      }
    }

    return allTickets;
  },
);
