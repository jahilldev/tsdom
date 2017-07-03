export interface IMeta {
    owner?: DOM;
}
export declare class DOM {
    [index: number]: HTMLElement;
    document: Document;
    meta: IMeta;
    regex: RegExp;
    length: number;
    constructor(qry: string | HTMLElement, ctx?: Element, meta?: IMeta);
    find(qry: string): DOM;
    css(obj: {
        [key: string]: string;
    }): this;
    each(cb: (el: HTMLElement) => void): this;
    hasClass(str: string): boolean;
    addClass(str: string): this;
    removeClass(str: string): this;
    on(ev: string, cb: EventListener): this;
    off(ev: string, cb: EventListener): this;
    private query(qry, ctx);
}
export declare function preventDefault(ev: Event): false | void;
declare const _default: (qry: string | HTMLElement, ctx?: HTMLElement) => DOM;
export default _default;
