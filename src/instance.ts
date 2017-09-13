import * as utility from './utility';
import * as event from './event';


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
 * Instance
 *
 * -------------------------------- */

export class Instance {


   [index: number]: HTMLElement;


   public length: number;
   private document: Document;
   private meta: IMeta;
   private events: any;


   public constructor(qry: string | HTMLElement, ctx?: Element, meta?: IMeta) {

      let els: any;

      this.document = document;
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


   public find (qry: string) {

      return new Instance(qry, this[0], { owner: this });

   }


   public closest(qry: string) {

      const doc = this.document;
      const match = doc.querySelectorAll(qry);

      let el = this[0];
      let i;

      do {

         i = match.length;

         while (--i >= 0 && match.item(i) !== el) {};

      } while (

         (i < 0) && (el = el.parentElement)
         
      );
      
      return new Instance(el);

   }


   public each (cb: (el: HTMLElement) => void) {

      for(let i = 0, len = this.length; i < len;) {

         let el: HTMLElement = this[i];

         if(cb.call(this, this[i], i++) == false) {
            break;
         }

      }

      return this;

   }


   public css(obj: { [key: string]: string }) {

      const self = this;

      this.each(el => {

         for(let key in obj) {

            const val = obj[key];

            el.style.setProperty(key, val);

         }

      });

      return this;

   }


   public attr(obj: { [key: string]: string }) {

      const self = this;

      this.each(el => {

         for(let key in obj) {

            const val = obj[key];

            el.setAttribute(key, val);

         }

      });

      return this;

   }


   public hasClass(str: string) {

      let result = false;

      this.each(el => {

         const value = ` ${str} `;
         const clean = (` ${el.className} `).replace(/[\n\t]/g, ' ');

         if(clean.indexOf(value) > -1) {

            result = true;

         }

      });

      return result;

   }


   public addClass(str: string) {

      this.each(el => {

         if(!this.hasClass(str)) {

            el.className += ' ' + str;

         }

      });

      return this;

   }


   public removeClass(str: string) {

      this.each(el => {

         if(this.hasClass(str)) {

            var reg = new RegExp('(\\s|^)' + str + '(\\s|$)');

            el.className = el.className.replace(reg, ' ');

         }

      });

      return this;

   }


   public toggleClass(str: string) {

      if(this.hasClass(str)) {

         this.removeClass(str);

      } else {

         this.addClass(str);

      }

      return this;

   }


   public on (ev: string, op1: string | IHandler, op2?: IHandler) {

      const self = this;
      const { events } = this;

      const direct = typeof op1 === 'function' && op2 === undefined;
      const delegate = typeof op1 === 'string' && typeof op2 === 'function';

      this.off(ev);

      this.each(el => {

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

   }

   
   public off (ev: string) {

      const self = this;
      const { events } = this; 

      this.each(el => {

         const active = events.find(ev);

         if(active !== undefined) {

            el.removeEventListener(ev, active.handler, true);
            
         }

      });

      events.remove(ev);

      return this;

   }


   public text(val?: string) {

      if(val == undefined) {
         
         return this[0].innerText;

      }

      this.each(el => {
         
         el.innerHTML = val;

      });

      return val;

   }


   public html(val?: string) {

      if(val == undefined) {

         return this[0].innerHTML;

      }

      this.each(el => {

         el.innerHTML = val;

      });

      return val;

   }


   public append(item: string | Node | HTMLElement) {

      this.each(el => {

         if(typeof item === 'string') {

            return el.insertAdjacentHTML('beforeend', item);

         }

         el.appendChild(item);

      });

      return this;

   }


   public prepend(item: string | Node | HTMLElement) {

      this.each(el => {

         if(typeof item === 'string') {

            return el.insertAdjacentHTML('afterbegin', item);

         }

         el.insertBefore(item, el.firstChild);

      });

      return this;

   }


   public empty() {

      this.each(el => {
         
         while (el.firstChild) {

            el.removeChild(el.firstChild);
         
         }

      });

      return this;

   }


   public remove() {

      this.each(el => {

         el.parentNode.removeChild(el);

      });

   }


   public toArray() {

      const array: HTMLElement[] = [];

      this.each(el => {

         array.push(el);

      });

      return array;

   }


}