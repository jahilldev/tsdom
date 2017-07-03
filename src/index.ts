

/* -----------------------------------
 *
 * Meta
 *
 * -------------------------------- */

interface IMeta {
   owner?: DOM;
}


/* -----------------------------------
 *
 * DOM
 *
 * -------------------------------- */

export class DOM {


   [index: number]: HTMLElement;


   document: Document;
   meta: IMeta;
   regex: RegExp;
   length: number;


   public constructor(qry: string | HTMLElement, ctx?: Element, meta?: IMeta) {

      let els: any;

      this.document = document;
      this.meta = meta || {};
      this.regex = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/;

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

      return new DOM(qry, this[0], { owner: this });

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


   public each (cb: (el: HTMLElement) => void) {

      for(let i = 0, len = this.length; i < len;) {

         let el: HTMLElement = this[i];

         if(cb.call(this, this[i], i++) == false) {
            break;
         }

      }

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


   public on (ev: string, cb: EventListener) {

      this.each(el => {

         el.addEventListener(ev, cb);

      });

      return this;

   }

   
   public off (ev: string, cb: EventListener) {

      this.each(el => {

         el.removeEventListener(ev, cb);

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

   return new DOM(qry, ctx);
   
};