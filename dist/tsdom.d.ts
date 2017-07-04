export interface ITSD_Meta {
    owner?: TSDom;
}
export interface ITSD_Events {
    type: string;
    handler: EventListener;
}
export declare class TSDom {
    [index: number]: HTMLElement;
    document: Document;
    meta: ITSD_Meta;
    regex: RegExp;
    length: number;
    events: ITSD_Events[];
    constructor(qry: string | HTMLElement, ctx?: Element, meta?: ITSD_Meta);
    find(qry: string): TSDom;
    each(cb: (el: HTMLElement) => void): this;
    css(obj: {
        [key: string]: string;
    }): this;
    hasClass(str: string): boolean;
    addClass(str: string): this;
    removeClass(str: string): this;
    on(ev: string, cb: EventListener): this;
    off(ev: string): this;
    private query(qry, ctx);
    private findEvent(ev);
}
export declare function preventDefault(ev: Event): false | void;
declare const _default: (qry: string | HTMLElement, ctx?: HTMLElement) => TSDom;
export default _default;
