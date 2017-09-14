import { Instance } from '../instance';


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