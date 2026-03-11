import { createSlice } from '@reduxjs/toolkit';
import type { EventModel } from '../gateway/event.gateway';

interface EventsState {
    events: EventModel[];
    isLoading: boolean;
    error: string | null;
}

const initialState: EventsState = {
    events: [],
    isLoading: false,
    error: null,
};

export const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        fetchEventsPending: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchEventsSuccess: (state, action) => {
            state.isLoading = false;
            state.events = action.payload;
        },
        fetchEventsFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchEventsPending, fetchEventsSuccess, fetchEventsFailure } = eventsSlice.actions;
export default eventsSlice.reducer;
