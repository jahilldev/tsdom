import { Instance } from '../index';


/* -----------------------------------
 *
 * Find
 *
 * -------------------------------- */

function find(qry: string) {

   const self: Instance = this;

   return new Instance(qry, self[0], { owner: self });

};


/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { find };