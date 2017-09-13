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

      let target = null;
      let hit = false;

      $elements.each(_el => {

         let test = ev.target as any;

         if(test == _el) {

            hit = true;
            target = test;

            return;

         }

         while(test && test !== scope) {

            test = test.parentNode;

            if(test == _el) {

               hit = true;
               target = test;

            }
            
         }

      });

      if(hit) {
         
         cb(ev, target);

      }
      
   };

}


/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { delegate };