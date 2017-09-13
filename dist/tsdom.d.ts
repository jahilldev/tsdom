import { Instance, IMeta } from '../src/instance';
export declare namespace TSDom {
    interface Init {
        (qry: string | HTMLElement, ctx?: Element, meta?: IMeta): Instance;
    }
    class Object extends Instance {
    }
}
declare const _default: (qry: string | HTMLElement, ctx?: HTMLElement) => Instance;
export default _default;
