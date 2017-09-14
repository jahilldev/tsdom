import { Instance } from './instance';


/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export default (qry: string | HTMLElement, ctx?: HTMLElement) => new Instance(qry, ctx);