import { Instance } from '../instance';


/* -----------------------------------
 *
 * Each
 *
 * -------------------------------- */

function each(cb: (el: HTMLElement) => void) {

   const self: Instance = this;

   for(let i = 0, len = self.length; i < len;) {
      
      let el: HTMLElement = self[i];

      if(cb.call(self, self[i], i++) == false) {
         break;
      }

   }

   return this;

};


/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { each };