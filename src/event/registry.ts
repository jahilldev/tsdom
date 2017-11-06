

/* -----------------------------------
 *
 * IEvents
 *
 * -------------------------------- */

export type IEvents = Registry;


/* -----------------------------------
 *
 * IEvent
 *
 * -------------------------------- */

export interface IEvent {
   type: string;
   handler: EventListener;
}


/* -----------------------------------
 *
 * IHandler
 *
 * -------------------------------- */

export type IHandler = (ev: Event, el: HTMLElement) => void;


/* -----------------------------------
 *
 * Registry
 *
 * -------------------------------- */

export class Registry {


   private list: IEvent[];


   public constructor() {

      this.list = [];

   }


   public find(ev: string) {

      const { list } = this;

      return list.filter(_ev => _ev.type === ev)[0];

   }


   public add(ev: IEvent) {

      this.list.push(ev)

   }


   public remove(ev: string) {

      const { list } = this;

      this.list = list.filter(_ev => _ev.type !== ev);

   }


}


/* -----------------------------------
 *
 * Function
 *
 * -------------------------------- */

function registry() {

   return new Registry();

}


/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { registry };