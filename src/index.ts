import { Instance, IMeta } from './instance';


/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export default (qry: string | HTMLElement, ctx?: HTMLElement) => {

   return new Instance(qry, ctx);
   
};