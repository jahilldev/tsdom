import { Instance } from '../index';


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