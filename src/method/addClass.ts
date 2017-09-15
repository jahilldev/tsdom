import { Instance } from '../index';


/* -----------------------------------
 *
 * addClass
 *
 * -------------------------------- */

function addClass(str: string) {

   const self: Instance = this;
   
   self.each(el => {
      
      if(!self.hasClass(str)) {

         el.className += ' ' + str;

      }

   });

   return this;

};


/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { addClass };