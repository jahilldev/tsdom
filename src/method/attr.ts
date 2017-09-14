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
 * Attr
 *
 * -------------------------------- */

function attr(obj: IObject) {

   const self: Instance = this;
   
   self.each(el => {

      for(let key in obj) {

         const val = obj[key];

         el.setAttribute(key, val);

      }

   });

   return this;

};


/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { attr };