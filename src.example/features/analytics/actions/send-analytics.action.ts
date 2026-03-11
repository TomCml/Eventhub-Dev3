import type { Dependencies } from "../../../store/dependencies";
import type { AppDispatch, AppGetState } from "../../../store/store";
import * as AnalyticsModel from "../model/analytics-model";
import { analyticsSlice } from "../store/analytics.slice";

export const sendAnalyticsAction = (event: AnalyticsModel.Event) => async (
    dispatch: AppDispatch,
    _: AppGetState,
    dependencies: Dependencies
) => {
    try {
        
        await dependencies.analyticsGateway.sendAnalytics(event);
        dispatch(analyticsSlice.actions.sendAnalyticsSuccess())
    } catch (error) {
            let message = "Une erreur est survenue";
        if(error instanceof Error){
            message = error.message
        }
    dispatch(analyticsSlice.actions.sendAnalyticsError(message))
    }
}