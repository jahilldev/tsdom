

/* -----------------------------------
 *
 * Direct
 *
 * -------------------------------- */

function direct(
   cb: (ev: Event, el: HTMLElement) => void
) {

   return (ev: Event) => {
      
      const target = ev.target as HTMLElement;

      cb(ev, target);
      
   };

}


/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { direct };