import axios from "axios";
import * as DashboardModel from "../model/dashboard.model";
import type { IDashboardQuery } from "./interfaces/dashboard-query.interface";

export class FetchAnalyticsDataApi implements IDashboardQuery {
    async fetchViewsPerPage(): Promise<DashboardModel.PageViewData[]> {
        const response = await axios.get("http://localhost:8000/analytics", {
            withCredentials: true
        });

        return response.data.data
    }
}