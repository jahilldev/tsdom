

/* -----------------------------------
 *
 * Default
 *
 * -------------------------------- */

export interface TSDom {
   (qry: string | HTMLElement, ctx?: Element, meta?: TSDomMeta): TSDomObject
}


/* -----------------------------------
 *
 * Meta
 *
 * -------------------------------- */

export interface TSDomMeta {
   owner?: TSDomObject;
}


/* -----------------------------------
 *
 * Events
 *
 * -------------------------------- */

export interface TSDomEvents {
   type: string;
   handler: EventListener;
}


/* -----------------------------------
 *
 * TSDom
 *
 * -------------------------------- */

export class TSDomObject {


   [index: number]: HTMLElement;


   document: Document;
   meta: TSDomMeta;
   regex: RegExp;
   length: number;
   events: TSDomEvents[];


   public constructor(qry: string | HTMLElement, ctx?: Element, meta?: TSDomMeta) {

      let els: any;

      this.document = document;
      this.meta = meta || {};
      this.regex = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/;
      this.events = [];

      if(typeof qry === 'string') {

         els = this.query(qry, ctx ? ctx : document);

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

      return new TSDomObject(qry, this[0], { owner: this });

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


   public on (ev: string, op1: string | EventListener, op2?: EventListener) {

      const self = this;

      const direct = typeof op1 === 'function' && op2 === undefined;
      const delegate = typeof op1 === 'string' && typeof op2 === 'function';

      this.off(ev);

      this.each(el => {

         let cb = null;

         if(direct) {
            cb = <EventListener>op1;
         }

         if(delegate) {
            cb = self.delegateEvent(el, <string>op1, op2);
         }

         if(cb) {
            
            el.addEventListener(ev, cb, false);

            self.events.push({
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

         const active = this.findEvent(ev);

         if(active !== undefined) {

            el.removeEventListener(ev, active.handler, false);
            
         }

      });

      this.events = events.filter(function(evt) {
      
         return (evt.type !== ev);
      
      }, event);

      return this;

   }


   public append(html: string) {

      this.each(el => {

         el.insertAdjacentHTML('beforeend', html);

      });

      return this;

   }


   public prepend(html: string) {

      this.each(el => {

         el.insertAdjacentHTML('afterbegin', html);

      });

      return this;

   }


   private query(qry: string, ctx: Element | Document) {

      const doc = this.document;

      let test;
      let match;

      if ((test = this.regex.exec(qry))) {

         if ((match = test[3])) {

            return ctx.getElementsByClassName(match);

         }

         if ((match = test[2])) {

            return ctx.getElementsByTagName(match);

         }

         if ((match = test[1])) {

            return doc.getElementById(match);

         }

      }

      return ctx.querySelectorAll(qry);

   }


   private findEvent(ev: string) {

      const { events } = this;

      return events.filter(function(_ev) {

         return (_ev.type === ev);

      }, ev)[0];

   }


   private delegateEvent(el: HTMLElement, qry: string, cb: EventListener) {

      return (ev: Event) => {

         let hit = false;
         let els = new TSDomObject(qry, el);

         els.each(_el => {
            if(ev.target == _el) {
               hit = true;
            }
         });

         if(hit) cb(ev);
         
      };

   }


}


/* -----------------------------------
 *
 * preventDefault
 *
 * -------------------------------- */

export function preventDefault(ev: Event) {

   if (ev.preventDefault) {

      return ev.preventDefault();
      
   }

   return ev.returnValue = false;

}


/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export default (qry: string | HTMLElement, ctx?: HTMLElement) => {

   return new TSDomObject(qry, ctx);
   
};