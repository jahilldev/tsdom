import { Instance } from '../index';


/* -----------------------------------
 *
 * toggleClass
 *
 * -------------------------------- */

function toggleClass(str: string) {

   const self: Instance = this;
   
   if(self.hasClass(str)) {
      
      self.removeClass(str);

   } else {

      self.addClass(str);

   }

   return this;

};


/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { toggleClass };