import { Instance } from '../instance';
import * as event from '../event';


/* -----------------------------------
 *
 * IHandler
 *
 * -------------------------------- */

export type IHandler = (ev: Event, el: HTMLElement) => void;


/* -----------------------------------
 *
 * On
 *
 * -------------------------------- */

function on(ev: string, op1: string | IHandler, op2?: IHandler) {

   const self: Instance = this;
   const { events } = self;
   
   const direct = typeof op1 === 'function' && op2 === undefined;
   const delegate = typeof op1 === 'string' && typeof op2 === 'function';

   self.off(ev);

   self.each(el => {

      let cb = null;

      if(direct) {

         cb = event.direct(op1 as IHandler);

      }

      if(delegate) {

         cb = event.delegate(el, op1 as string, op2);

      }

      if(cb) {

         el.addEventListener(ev, cb, true);

         events.add({
            type: ev,
            handler: cb
         });

      } else {

         throw new Error('TSDom.on: Invalid Arguments');

      }

   });

   return this;

};


/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { on };