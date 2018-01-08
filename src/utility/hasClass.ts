

/* -----------------------------------
 *
 * hasClass
 *
 * -------------------------------- */

function hasClass(
   el: HTMLElement,
   str: string
) {

   let result = false;

   const value = ` ${str} `;
   const clean = ` ${el.className} `.replace(/[\n\t]/g, ' ');

   if(clean.indexOf(value) > -1) {

      result = true;

   }

   return result;

}


/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { hasClass };