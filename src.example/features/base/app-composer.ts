import type { Dependencies } from "../../store/dependencies";
import { createStore, type AppStore } from "../../store/store";
import { SendAnalyticsApi } from "../analytics/api/send-analytics.api";
import { FetchMeApi } from "../auth/api/fetch-user.api";
import { LoginUserApi } from "../auth/api/login-user-api";
import { RegisterUserApi } from "../auth/api/register-user-api";
import { FetchAnalyticsDataApi } from "../dashboard/api/fetch-analytics-data.api";
import { FetchProjectsApi } from "../projects/api/fetch-projects.api";

export class App {
    public dependencies: Dependencies;
    public store: AppStore;

    constructor() {
        this.dependencies = this.setupDependencies();
        this.store = createStore({ dependencies: this.dependencies });
    }

    setupDependencies(): Dependencies {
        return {
            registerGateway: new RegisterUserApi(),
            loginGateway: new LoginUserApi(),
            fetchProjects: new FetchProjectsApi(),
            fetchMe: new FetchMeApi(),
            analyticsGateway: new SendAnalyticsApi(),
            dashboardQuery: new FetchAnalyticsDataApi()
        };
    }}

export const app = new App();

