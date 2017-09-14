import { Instance } from '../instance';


/* -----------------------------------
 *
 * Delegate
 *
 * -------------------------------- */

function delegate(
   scope: HTMLElement,
   query: string,
   cb: (ev: Event, el: HTMLElement) => void
) {

   return (ev: Event) => {
      
      const $elements = new Instance(query, scope);

      let el = null;
      let hit = false;

      $elements.each(_el => {

         let test = ev.target as any;

         if(test == _el) {

            hit = true;
            el = test;

            return;

         }

         while(test && test !== scope) {

            test = test.parentNode;

            if(test == _el) {

               hit = true;
               el = test;

            }
            
         }

      });

      if(hit) {
         
         cb(ev, el);

      }
      
   };

}


/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { delegate };