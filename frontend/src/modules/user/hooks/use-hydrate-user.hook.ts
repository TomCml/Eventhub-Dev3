import { useEffect } from "react";
import { useAppDispatch } from "../../store/store";
import { fetchProfileAction } from "../actions/fetch-profile.action";

export const useHydrateUser = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProfileAction());
    }, [dispatch]);
};
