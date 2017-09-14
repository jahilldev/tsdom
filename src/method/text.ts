import { Instance } from '../instance';
import * as event from '../event';


/* -----------------------------------
 *
 * Text
 *
 * -------------------------------- */

function text(val?: string) {

   const self: Instance = this;

   if(val == undefined) {
      
      return self[0].innerText;

   }

   self.each(el => {
      
      el.innerHTML = val;

   });

   return val;

};


/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { text };