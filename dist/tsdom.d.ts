export interface IMeta {
    owner?: TSDom;
}
export interface IEvents {
    type: string;
    handler: EventListener;
}
export declare class TSDom {
    [index: number]: HTMLElement;
    document: Document;
    meta: IMeta;
    regex: RegExp;
    length: number;
    events: IEvents[];
    constructor(qry: string | HTMLElement, ctx?: Element, meta?: IMeta);
    find(qry: string): TSDom;
    css(obj: {
        [key: string]: string;
    }): this;
    each(cb: (el: HTMLElement) => void): this;
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
