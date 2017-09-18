import { Dom, IMeta } from './src/index';


/* -----------------------------------
 *
 * Namespace
 *
 * -------------------------------- */

export declare namespace TSDom {

   export interface Init {
      (qry: string | HTMLElement, ctx?: Element, meta?: IMeta): Dom;
   }

   export class Object extends Dom {}

}


/* -----------------------------------
 *
 * Default
 *
 * -------------------------------- */

export default (qry: string | HTMLElement, ctx?: HTMLElement) => new Dom(qry, ctx);