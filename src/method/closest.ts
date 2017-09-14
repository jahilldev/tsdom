import { Instance } from '../instance';


/* -----------------------------------
 *
 * Closest
 *
 * -------------------------------- */

function closest(qry: string) {

   const self: Instance = this;
   const match = document.querySelectorAll(qry);
   
   let el = self[0];
   let i;

   do {

      i = match.length;

      while (--i >= 0 && match.item(i) !== el) {};

   } while (

      (i < 0) && (el = el.parentElement)
      
   );
   
   return new Instance(el);

};


/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { closest };