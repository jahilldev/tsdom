import { IHandler, IEvents } from './event/registry';
export interface IMeta {
    owner?: Instance;
}
export declare class Instance {
    [index: number]: HTMLElement;
    length: number;
    events: IEvents;
    private meta;
    constructor(qry: string | HTMLElement, ctx?: Element, meta?: IMeta);
    find(qry: string): Instance;
    closest(qry: string): Instance;
    each(cb: (el: HTMLElement) => void): this;
    css(obj: {
        [index: string]: string;
    }): this;
    attr(obj: {
        [index: string]: string;
    } | string): string;
    hasClass(str: string): boolean;
    addClass(str: string): this;
    removeClass(str: string): this;
    toggleClass(str: string): this;
    on(ev: string, op1: string | IHandler, op2?: IHandler): this;
    off(ev: string): this;
    text(val?: string): string;
    data(key: string, val?: string): string;
    html(val?: string): string;
    append(item: string | Node | HTMLElement): this;
    prepend(item: string | Node | HTMLElement): this;
    empty(): this;
    remove(): void;
    toArray(): HTMLElement[];
}
export declare namespace TSDom {
    interface Init {
        (qry: string | HTMLElement, ctx?: Element, meta?: IMeta): Instance;
    }
    class Object extends Instance {
    }
}
declare const _default: (qry: string | HTMLElement, ctx?: HTMLElement) => Instance;
export default _default;
