import axios from "axios";
import type { EventGateway, EventModel } from "../gateway/event.gateway";

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000/api';

export class HttpEventGateway implements EventGateway {
    async findAll(): Promise<EventModel[]> {
        try {
            const response = await axios.get(`${API_BASE}/events`, {
                withCredentials: true
            });
            return response.data.data;
        } catch (error) {
            console.error("Failed to fetch events:", error);
            throw error;
        }
    }

    async findById(id: string): Promise<EventModel | null> {
        try {
            const response = await axios.get(`${API_BASE}/events/${id}`, {
                withCredentials: true
            });
            return response.data.data;
        } catch (error: any) {
            if (error.response?.status === 404) {
                return null;
            }
            console.error(`Failed to fetch event ${id}:`, error);
            throw error;
        }
    }
}
