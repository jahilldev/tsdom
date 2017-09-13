

/* -----------------------------------
 *
 * Variables
 *
 * -------------------------------- */

const regex = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/;


/* -----------------------------------
 *
 * Query
 *
 * -------------------------------- */

function query(
   qry: string, 
   ctx: Element | Document
) {

   let test;
   let match;

   if ((test = regex.exec(qry))) {

      if ((match = test[3])) {

         return ctx.getElementsByClassName(match);

      }

      if ((match = test[2])) {

         return ctx.getElementsByTagName(match);

      }

      if ((match = test[1])) {

         return (ctx as Document).getElementById(match);

      }

   }

   return ctx.querySelectorAll(qry);

}


/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { query };