import { Instance } from '../instance';


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