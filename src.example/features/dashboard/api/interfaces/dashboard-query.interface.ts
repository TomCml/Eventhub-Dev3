import * as DashboardModel from "../../model/dashboard.model";

export interface IDashboardQuery {
    fetchViewsPerPage(): Promise<DashboardModel.PageViewData[]>; 
}