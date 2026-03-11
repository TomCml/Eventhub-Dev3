import { useSelector } from "react-redux";
import { useAppDispatch, type AppState } from "../../../store/store"
import { fetchViewsPerPage } from "../queries/fetch-view-per-page.query";
import { useEffect } from "react";

export const useDashboardData = () => {
    const dispatch = useAppDispatch();

    const {data, status, error} = useSelector((state: AppState) => state.dashboard);

    useEffect(() => {
        dispatch(fetchViewsPerPage());
    },[dispatch])

    return {data, status, error}
}