export declare type IEvents = Registry;
export interface IEvent {
    type: string;
    handler: EventListener;
}
export declare type IHandler = (ev: Event, el: HTMLElement) => void;
export declare class Registry {
    private list;
    constructor();
    find(ev: string): IEvent[];
    add(ev: IEvent): void;
    remove(ev: string): void;
}
declare function registry(): Registry;
export { registry };
