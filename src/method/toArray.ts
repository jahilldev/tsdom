import { Instance } from '../index';


/* -----------------------------------
 *
 * ToArray
 *
 * -------------------------------- */

function toArray() {

   const self: Instance = this;
   const array: HTMLElement[] = [];
   
   self.each(el => {

      array.push(el);

   });

   return array;

};


/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { toArray };