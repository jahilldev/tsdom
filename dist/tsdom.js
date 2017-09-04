"use strict";
/* -----------------------------------
 *
 * Default
 *
 * -------------------------------- */
Object.defineProperty(exports, "__esModule", { value: true });
/* -----------------------------------
 *
 * TSDom
 *
 * -------------------------------- */
var TSDomObject = (function () {
    function TSDomObject(qry, ctx, meta) {
        var els;
        this.document = document;
        this.meta = meta || {};
        this.regex = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/;
        this.events = [];
        if (typeof qry === 'string') {
            els = this.query(qry, ctx ? ctx : document);
        }
        else {
            els = qry;
        }
        if (!els)
            return this;
        if (els.nodeType === 1 || els === window) {
            this[0] = els;
            this.length = 1;
        }
        else {
            for (var len = (this.length = els.length); len--; this[len] = els[len])
                ;
        }
    }
    TSDomObject.prototype.find = function (qry) {
        return new TSDomObject(qry, this[0], { owner: this });
    };
    TSDomObject.prototype.closest = function (qry) {
        var doc = this.document;
        var match = doc.querySelectorAll(qry);
        var el = this[0];
        var i;
        do {
            i = match.length;
            while (--i >= 0 && match.item(i) !== el) { }
            ;
        } while ((i < 0) && (el = el.parentElement));
        return new TSDomObject(el);
    };
    TSDomObject.prototype.each = function (cb) {
        for (var i = 0, len = this.length; i < len;) {
            var el = this[i];
            if (cb.call(this, this[i], i++) == false) {
                break;
            }
        }
        return this;
    };
    TSDomObject.prototype.css = function (obj) {
        var self = this;
        this.each(function (el) {
            for (var key in obj) {
                var val = obj[key];
                el.style.setProperty(key, val);
            }
        });
        return this;
    };
    TSDomObject.prototype.attr = function (obj) {
        var self = this;
        this.each(function (el) {
            for (var key in obj) {
                var val = obj[key];
                el.setAttribute(key, val);
            }
        });
        return this;
    };
    TSDomObject.prototype.hasClass = function (str) {
        var result = false;
        this.each(function (el) {
            var value = " " + str + " ";
            var clean = (" " + el.className + " ").replace(/[\n\t]/g, ' ');
            if (clean.indexOf(value) > -1) {
                result = true;
            }
        });
        return result;
    };
    TSDomObject.prototype.addClass = function (str) {
        var _this = this;
        this.each(function (el) {
            if (!_this.hasClass(str)) {
                el.className += ' ' + str;
            }
        });
        return this;
    };
    TSDomObject.prototype.removeClass = function (str) {
        var _this = this;
        this.each(function (el) {
            if (_this.hasClass(str)) {
                var reg = new RegExp('(\\s|^)' + str + '(\\s|$)');
                el.className = el.className.replace(reg, ' ');
            }
        });
        return this;
    };
    TSDomObject.prototype.toggleClass = function (str) {
        if (this.hasClass(str)) {
            this.removeClass(str);
        }
        else {
            this.addClass(str);
        }
        return this;
    };
    TSDomObject.prototype.on = function (ev, op1, op2) {
        var self = this;
        var direct = typeof op1 === 'function' && op2 === undefined;
        var delegate = typeof op1 === 'string' && typeof op2 === 'function';
        this.off(ev);
        this.each(function (el) {
            var cb = null;
            if (direct) {
                cb = op1;
            }
            if (delegate) {
                cb = self.delegateEvent(el, op1, op2);
            }
            if (cb) {
                el.addEventListener(ev, cb, false);
                self.events.push({
                    type: ev,
                    handler: cb
                });
            }
            else {
                throw new Error('TSDom.on: Invalid Arguments');
            }
        });
        return this;
    };
    TSDomObject.prototype.off = function (ev) {
        var _this = this;
        var self = this;
        var events = this.events;
        this.each(function (el) {
            var active = _this.findEvent(ev);
            if (active !== undefined) {
                el.removeEventListener(ev, active.handler, false);
            }
        });
        this.events = events.filter(function (evt) {
            return (evt.type !== ev);
        });
        return this;
    };
    TSDomObject.prototype.text = function (val) {
        if (val == undefined) {
            return this[0].innerText;
        }
        this.each(function (el) {
            el.innerHTML = val;
        });
        return val;
    };
    TSDomObject.prototype.html = function (val) {
        if (val == undefined) {
            return this[0].innerHTML;
        }
        this.each(function (el) {
            el.innerHTML = val;
        });
        return val;
    };
    TSDomObject.prototype.append = function (html) {
        this.each(function (el) {
            el.insertAdjacentHTML('beforeend', html);
        });
        return this;
    };
    TSDomObject.prototype.prepend = function (html) {
        this.each(function (el) {
            el.insertAdjacentHTML('afterbegin', html);
        });
        return this;
    };
    TSDomObject.prototype.empty = function () {
        this.each(function (el) {
            while (el.firstChild) {
                el.removeChild(el.firstChild);
            }
        });
        return this;
    };
    TSDomObject.prototype.remove = function () {
        this.each(function (el) {
            el.parentNode.removeChild(el);
        });
    };
    TSDomObject.prototype.query = function (qry, ctx) {
        var doc = this.document;
        var test;
        var match;
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
    };
    TSDomObject.prototype.findEvent = function (ev) {
        var events = this.events;
        return events.filter(function (_ev) {
            return (_ev.type === ev);
        }, ev)[0];
    };
    TSDomObject.prototype.delegateEvent = function (el, qry, cb) {
        return function (ev) {
            var hit = false;
            var els = new TSDomObject(qry, el);
            els.each(function (_el) {
                if (ev.target == _el) {
                    hit = true;
                }
            });
            if (hit)
                cb(ev);
        };
    };
    return TSDomObject;
}());
exports.TSDomObject = TSDomObject;
/* -----------------------------------
 *
 * preventDefault
 *
 * -------------------------------- */
function preventDefault(ev) {
    if (ev.preventDefault) {
        return ev.preventDefault();
    }
    return ev.returnValue = false;
}
exports.preventDefault = preventDefault;
/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */
exports.default = function (qry, ctx) {
    return new TSDomObject(qry, ctx);
};
