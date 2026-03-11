import axios from "axios";
import type { IFetchMeInterface } from "./interfaces/fetch-me.interface";

export class FetchMeApi implements IFetchMeInterface {
    async fetchMe(){
        const response = await axios.get("http://localhost:8000/auth/me", {
            withCredentials: true
        })

        return response.data.data
    }
}