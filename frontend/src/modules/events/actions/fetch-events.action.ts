import type { AppDispatch, AppGetState } from "../../store/store";
import type { Dependencies } from "../../store/dependencies";
import { fetchEventsPending, fetchEventsSuccess, fetchEventsFailure } from "../store/events.slice";

export const fetchEventsAction = () => async (
    dispatch: AppDispatch,
    _getState: AppGetState,
    { eventGateway }: Dependencies
) => {
    dispatch(fetchEventsPending());
    try {
        const events = await eventGateway.findAll();
        dispatch(fetchEventsSuccess(events));
    } catch (error: any) {
        const errorMessage = error.response?.data?.error?.message || error.message || "Erreur lors du chargement des évènements";
        dispatch(fetchEventsFailure(errorMessage));
    }
};
