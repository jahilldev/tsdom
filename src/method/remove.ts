import { Instance } from '../instance';


/* -----------------------------------
 *
 * Remove
 *
 * -------------------------------- */

function remove() {

   const self: Instance = this;

   self.each(el => {
      
      el.parentNode.removeChild(el);

   });

};


/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { remove };