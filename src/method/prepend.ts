import { Instance } from '../instance';


/* -----------------------------------
 *
 * Prepend
 *
 * -------------------------------- */

function prepend(item: string | Node | HTMLElement) {

   const self: Instance = this;

   self.each(el => {
      
      if(typeof item === 'string') {

         return el.insertAdjacentHTML('afterbegin', item);

      }

      el.insertBefore(item, el.firstChild);

   });

   return this;

};


/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { prepend };