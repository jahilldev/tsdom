import { Instance } from '../instance';


/* -----------------------------------
 *
 * IObject
 *
 * -------------------------------- */

interface IObject {
   [key: string]: string;
}


/* -----------------------------------
 *
 * CSS
 *
 * -------------------------------- */

function css(obj: IObject) {

   const self: Instance = this;
   
   self.each(el => {

      for(let key in obj) {

         const val = obj[key];

         el.style.setProperty(key, val);

      }

   });

   return this;

};


/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { css };