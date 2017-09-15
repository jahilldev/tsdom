import { Instance, IMeta } from './src/index';


/* -----------------------------------
 *
 * Namespace
 *
 * -------------------------------- */

export declare namespace TSDom {

   export interface Init {
      (qry: string | HTMLElement, ctx?: Element, meta?: IMeta): Instance;
   }

   export class Object extends Instance {}

}


/* -----------------------------------
 *
 * Default
 *
 * -------------------------------- */

export default (qry: string | HTMLElement, ctx?: HTMLElement) => new Instance(qry, ctx);