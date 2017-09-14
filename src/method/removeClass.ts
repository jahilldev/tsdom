import { Instance } from '../instance';


/* -----------------------------------
 *
 * removeClass
 *
 * -------------------------------- */

function removeClass(str: string) {

   const self: Instance = this;
   
   self.each(el => {

      if(self.hasClass(str)) {

         var reg = new RegExp('(\\s|^)' + str + '(\\s|$)');

         el.className = el.className.replace(reg, '');

      }

   });

   return this;

};


/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { removeClass };