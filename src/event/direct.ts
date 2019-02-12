/* -----------------------------------
 *
 * Direct
 *
 * -------------------------------- */

function direct(cb: (ev: Event, el: HTMLElement) => void) {
   return (ev: Event) => {
      const el = ev.currentTarget as HTMLElement;

      cb(ev, el);
   };
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { direct };
