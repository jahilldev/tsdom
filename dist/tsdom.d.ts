export interface TSDom {
    (qry: string | HTMLElement, ctx?: Element, meta?: TSDomMeta): TSDomObject;
}
export interface TSDomMeta {
    owner?: TSDomObject;
}
export interface TSDomEvents {
    type: string;
    handler: EventListener;
}
export declare class TSDomObject {
    [index: number]: HTMLElement;
    document: Document;
    meta: TSDomMeta;
    regex: RegExp;
    length: number;
    events: TSDomEvents[];
    constructor(qry: string | HTMLElement, ctx?: Element, meta?: TSDomMeta);
    find(qry: string): TSDomObject;
    closest(qry: string): TSDomObject;
    each(cb: (el: HTMLElement) => void): this;
    css(obj: {
        [key: string]: string;
    }): this;
    attr(obj: {
        [key: string]: string;
    }): this;
    hasClass(str: string): boolean;
    addClass(str: string): this;
    removeClass(str: string): this;
    toggleClass(str: string): this;
    on(ev: string, op1: string | EventListener, op2?: EventListener): this;
    off(ev: string): this;
    text(val?: string): string;
    html(val?: string): string;
    append(html: string): this;
    prepend(html: string): this;
    empty(): this;
    private query(qry, ctx);
    private findEvent(ev);
    private delegateEvent(el, qry, cb);
}
export declare function preventDefault(ev: Event): false | void;
declare const _default: (qry: string | HTMLElement, ctx?: HTMLElement) => TSDomObject;
export default _default;
