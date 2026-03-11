import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { AppState } from '../../store/store';
import { useAppDispatch } from '../../store/store';
import { fetchEventsAction } from '../actions/fetch-events.action';

export const useEvents = () => {
    const dispatch = useAppDispatch();
    const { events, isLoading, error } = useSelector((state: AppState) => state.events);

    useEffect(() => {
        // Fetch only if needed (e.g., list empty and no error)
        if (events.length === 0 && !error && !isLoading) {
            dispatch(fetchEventsAction());
        }
    }, [dispatch, events.length, error, isLoading]);

    const refreshEvents = () => {
        dispatch(fetchEventsAction());
    };

    return {
        events,
        isLoading,
        error,
        refreshEvents,
    };
};
