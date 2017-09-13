import { Instance, IMeta } from '../src/instance';


/* -----------------------------------
 *
 * Namespace
 *
 * -------------------------------- */

export namespace TSDom {

   export interface Init {
      (qry: string | HTMLElement, ctx?: Element, meta?: IMeta): Instance;
   }

   export class Object extends Instance {}

}


/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export default (qry: string | HTMLElement, ctx?: HTMLElement) => {

   return new Instance(qry, ctx);
   
};