import { DOM } from './index';


/* -----------------------------------
 *
 * TSDom
 *
 * -------------------------------- */

declare module TSDom {

   export default function (qry: string | HTMLElement, ctx?: HTMLElement): DOM;

}