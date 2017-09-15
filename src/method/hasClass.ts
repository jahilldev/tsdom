import { Instance } from '../index';


/* -----------------------------------
 *
 * hasClass
 *
 * -------------------------------- */

function hasClass(str: string) {

   const self: Instance = this;
   
   let result = false;
   
   self.each(el => {

      const value = ` ${str} `;
      const clean = (` ${el.className} `).replace(/[\n\t]/g, ' ');

      if(clean.indexOf(value) > -1) {

         result = true;

      }

   });

   return result;

};


/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { hasClass };