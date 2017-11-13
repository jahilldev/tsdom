"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utility = require("./utility");
var event = require("./event");
/* -----------------------------------
 *
 * Instance
 *
 * -------------------------------- */
var Instance = /** @class */ (function () {
    function Instance(qry, ctx, meta) {
        var els;
        this.meta = meta || {};
        this.events = event.registry();
        if (typeof qry === 'string') {
            els = utility.query(qry, ctx ? ctx : document);
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
    Instance.prototype.find = function (qry) {
        return new Instance(qry, this[0], { owner: this });
    };
    Instance.prototype.closest = function (qry) {
        var match = document.querySelectorAll(qry);
        var el = this[0];
        var i;
        do {
            i = match.length;
            while (--i >= 0 && match.item(i) !== el) { }
            ;
        } while ((i < 0) && (el = el.parentElement));
        return new Instance(el);
    };
    Instance.prototype.each = function (cb) {
        for (var i = 0, len = this.length; i < len;) {
            var el = this[i];
            if (cb.call(this, this[i], i++) == false) {
                break;
            }
        }
        return this;
    };
    Instance.prototype.css = function (obj) {
        this.each(function (el) {
            for (var key in obj) {
                var val = obj[key];
                el.style.setProperty(key, val);
            }
        });
        return this;
    };
    Instance.prototype.attr = function (obj) {
        this.each(function (el) {
            for (var key in obj) {
                var val = obj[key];
                el.setAttribute(key, val);
            }
        });
        return this;
    };
    Instance.prototype.hasClass = function (str) {
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
    Instance.prototype.addClass = function (str) {
        var _this = this;
        this.each(function (el) {
            if (!_this.hasClass(str)) {
                el.className += ' ' + str;
            }
        });
        return this;
    };
    Instance.prototype.removeClass = function (str) {
        var _this = this;
        this.each(function (el) {
            if (_this.hasClass(str)) {
                var reg = new RegExp('(\\s|^)' + str + '(\\s|$)');
                el.className = el.className.replace(reg, '');
            }
        });
        return this;
    };
    Instance.prototype.toggleClass = function (str) {
        if (this.hasClass(str)) {
            this.removeClass(str);
        }
        else {
            this.addClass(str);
        }
        return this;
    };
    Instance.prototype.on = function (ev, op1, op2) {
        var events = this.events;
        var direct = typeof op1 === 'function' && op2 === undefined;
        var delegate = typeof op1 === 'string' && typeof op2 === 'function';
        this.off(ev);
        this.each(function (el) {
            var cb = null;
            if (direct) {
                cb = event.direct(op1);
            }
            if (delegate) {
                cb = event.delegate(el, op1, op2);
            }
            if (cb) {
                el.addEventListener(ev, cb, true);
                events.add({
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
    Instance.prototype.off = function (ev) {
        var events = this.events;
        this.each(function (el) {
            var active = events.find(ev);
            if (active !== undefined) {
                el.removeEventListener(ev, active.handler, true);
            }
        });
        events.remove(ev);
        return this;
    };
    Instance.prototype.text = function (val) {
        if (val == undefined) {
            return this[0].innerText;
        }
        this.each(function (el) {
            el.innerHTML = val;
        });
        return val;
    };
    Instance.prototype.data = function (key, val) {
        if (val == undefined) {
            return this[0].getAttribute("data-" + key);
        }
        this.each(function (el) {
            el.setAttribute("data-" + key, val);
        });
        return val;
    };
    Instance.prototype.html = function (val) {
        if (val == undefined) {
            return this[0].innerHTML;
        }
        this.each(function (el) {
            el.innerHTML = val;
        });
        return val;
    };
    Instance.prototype.append = function (item) {
        this.each(function (el) {
            if (typeof item === 'string') {
                return el.insertAdjacentHTML('beforeend', item);
            }
            el.appendChild(item);
        });
        return this;
    };
    Instance.prototype.prepend = function (item) {
        this.each(function (el) {
            if (typeof item === 'string') {
                return el.insertAdjacentHTML('afterbegin', item);
            }
            el.insertBefore(item, el.firstChild);
        });
        return this;
    };
    Instance.prototype.empty = function () {
        this.each(function (el) {
            while (el.firstChild) {
                el.removeChild(el.firstChild);
            }
        });
        return this;
    };
    Instance.prototype.remove = function () {
        this.each(function (el) {
            el.parentNode.removeChild(el);
        });
    };
    Instance.prototype.toArray = function () {
        var array = [];
        this.each(function (el) {
            array.push(el);
        });
        return array;
    };
    return Instance;
}());
exports.Instance = Instance;
/* -----------------------------------
 *
 * Constructor
 *
 * -------------------------------- */
exports.default = function (qry, ctx) { return new Instance(qry, ctx); };
