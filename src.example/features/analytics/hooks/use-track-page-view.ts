import { useEffect } from "react";
import { useAppDispatch } from "../../../store/store"
import { sendAnalyticsAction } from "../actions/send-analytics.action";

export const useTrackPageView = (page: string) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(sendAnalyticsAction({
            eventName: "pageview",
            userId: "user-id",
            page,
            timestamp: new Date()
        }));
    }, [dispatch, page])
}