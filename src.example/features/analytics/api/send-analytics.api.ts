import axios from "axios";
import * as AnalyticsModel from "../model/analytics-model"
import type { IAnalyticsGateway } from "./interfaces/analytics-gateway.interface";

export class SendAnalyticsApi implements IAnalyticsGateway {
    async sendAnalytics(event: AnalyticsModel.Event): Promise<void> {
        await axios.post("http://localhost:8000/analytics", event)
    }


}