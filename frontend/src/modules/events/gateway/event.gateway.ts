export interface EventModel {
    id: string;
    title: string;
    description: string | null;
    startDate: string;
    venueId: string;
    capacity: number;
    price: number | null;
    organizerId: string;
    categoryId: string;
    imageUrl: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface EventGateway {
    findAll(): Promise<EventModel[]>;
    findById(id: string): Promise<EventModel | null>;
}
