import { Instance } from '../instance';


/* -----------------------------------
 *
 * Append
 *
 * -------------------------------- */

function append(item: string | Node | HTMLElement) {

   const self: Instance = this;

   self.each(el => {
      
      if(typeof item === 'string') {

         return el.insertAdjacentHTML('beforeend', item);

      }

      el.appendChild(item);

   });

   return this;

};


/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { append };