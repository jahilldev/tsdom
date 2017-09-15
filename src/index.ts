import * as utility from './utility';
import * as event from './event';
import * as method from './method';
import { IEvents } from './event/registry';


/* -----------------------------------
 *
 * IMeta
 *
 * -------------------------------- */

export interface IMeta {
   owner?: Instance;
}


/* -----------------------------------
 *
 * IHandler
 *
 * -------------------------------- */

export type IHandler = (ev: Event, el: HTMLElement) => void;


/* -----------------------------------
 *
 * Constructor
 *
 * -------------------------------- */

export default (qry: string | HTMLElement, ctx?: HTMLElement) => new Instance(qry, ctx);


/* -----------------------------------
 *
 * Instance
 *
 * -------------------------------- */

export class Instance {
   
   
   [index: number]: HTMLElement;


   public length: number;
   public events: IEvents;
   private meta: IMeta;


   public constructor(qry: string | HTMLElement, ctx?: Element, meta?: IMeta) {

      let els: any;

      this.meta = meta || {};
      this.events = event.registry();

      if(typeof qry === 'string') {

         els = utility.query(qry, ctx ? ctx : document);

      } else {

         els = qry;

      }

      if (!els) return this

      if (els.nodeType === 1 || els === window) {
         
         this[0] = els;
         this.length = 1
      
      } else {

         for (
            let len = (this.length = els.length);
            len--;
            this[len] = els[len]
         );

      }

   }


   public find = method.find
   public closest = method.closest
   public each = method.each
   public css = method.css
   public attr = method.attr
   public hasClass = method.hasClass
   public addClass = method.addClass
   public removeClass = method.removeClass
   public toggleClass = method.toggleClass
   public on = method.on
   public off = method.off
   public text = method.text
   public html = method.html
   public append = method.append
   public prepend = method.prepend
   public empty = method.empty
   public remove = method.remove
   public toArray = method.toArray

   
}