import axios from "axios";
import type { EventGateway, EventModel } from "../gateway/event.gateway";

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000/api';

export class HttpEventGateway implements EventGateway {
    async findAll(): Promise<EventModel[]> {
        const response = await axios.get(`${API_BASE}/events`, {
            withCredentials: true
        });
        return response.data.data; 
    }

    async findById(id: string): Promise<EventModel | null> {
        const response = await axios.get(`${API_BASE}/events/${id}`, {
            withCredentials: true
        });
        return response.data.data;
    }
}
