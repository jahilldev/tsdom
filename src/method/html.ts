import { Instance } from '../instance';


/* -----------------------------------
 *
 * HTML
 *
 * -------------------------------- */

function html(val?: string) {

   const self: Instance = this;

   if(val == undefined) {
      
      return self[0].innerHTML;

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

export { html };