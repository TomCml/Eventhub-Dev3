import * as AnalyticsModel from "../../model/analytics-model"
export interface IAnalyticsGateway {
    sendAnalytics(event: AnalyticsModel.Event): Promise <void>
}