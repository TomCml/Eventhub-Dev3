import type { IAnalyticsGateway } from "../features/analytics/api/interfaces/analytics-gateway.interface";
import type { IFetchMeInterface } from "../features/auth/api/interfaces/fetch-me.interface";
import type { ILoginGateway } from "../features/auth/api/interfaces/login-user-gateway.interface";
import type { IRegisterGateway } from "../features/auth/api/interfaces/register-user-gateway.interface";
import type { IDashboardQuery } from "../features/dashboard/api/interfaces/dashboard-query.interface";
import type { FetchProjectsApi } from "../features/projects/api/fetch-projects.api";

export type Dependencies = {
    registerGateway: IRegisterGateway;
    loginGateway: ILoginGateway;
    fetchProjects: FetchProjectsApi,
    fetchMe: IFetchMeInterface,
    analyticsGateway: IAnalyticsGateway;
    dashboardQuery: IDashboardQuery;
};