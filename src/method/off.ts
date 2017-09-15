import { Instance } from '../index';
import * as event from '../event';


/* -----------------------------------
 *
 * Off
 *
 * -------------------------------- */

function off(ev: string) {

   const self: Instance = this;
   const { events } = self; 

   self.each(el => {

      const active = events.find(ev);

      if(active !== undefined) {

         el.removeEventListener(ev, active.handler, true);
         
      }

   });

   events.remove(ev);

   return this;

};


/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { off };