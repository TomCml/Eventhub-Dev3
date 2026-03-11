export type EventType = "pageview" | "click" | "purchase" | "add-to-cart" | "remove-from-cart";

export type Event = {
    eventName: EventType;
    userId: string;
    page: string;
    timestamp: Date
}