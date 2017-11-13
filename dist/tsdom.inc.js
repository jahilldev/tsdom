(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.tsdom = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
/* -----------------------------------
 *
 * Delegate
 *
 * -------------------------------- */
function delegate(scope, query, cb) {
    return function (ev) {
        var $elements = new index_1.Instance(query, scope);
        var el = null;
        var hit = false;
        $elements.each(function (_el) {
            var test = ev.target;
            if (test == _el) {
                hit = true;
                el = test;
                return;
            }
            while (test && test !== scope) {
                test = test.parentNode;
                if (test == _el) {
                    hit = true;
                    el = test;
                }
            }
        });
        if (hit) {
            cb(ev, el);
        }
    };
}
exports.delegate = delegate;
},{"../index":6}],2:[function(require,module,exports){
"use strict";
/* -----------------------------------
 *
 * Direct
 *
 * -------------------------------- */
Object.defineProperty(exports, "__esModule", { value: true });
function direct(cb) {
    return function (ev) {
        var el = ev.currentTarget;
        cb(ev, el);
    };
}
exports.direct = direct;
},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var registry_1 = require("./registry");
exports.registry = registry_1.registry;
var direct_1 = require("./direct");
exports.direct = direct_1.direct;
var delegate_1 = require("./delegate");
exports.delegate = delegate_1.delegate;
},{"./delegate":1,"./direct":2,"./registry":4}],4:[function(require,module,exports){
"use strict";
/* -----------------------------------
 *
 * IEvents
 *
 * -------------------------------- */
Object.defineProperty(exports, "__esModule", { value: true });
/* -----------------------------------
 *
 * Registry
 *
 * -------------------------------- */
var Registry = /** @class */ (function () {
    function Registry() {
        this.list = [];
    }
    Registry.prototype.find = function (ev) {
        var list = this.list;
        return list.filter(function (_ev) { return _ev.type === ev; })[0];
    };
    Registry.prototype.add = function (ev) {
        this.list.push(ev);
    };
    Registry.prototype.remove = function (ev) {
        var list = this.list;
        this.list = list.filter(function (_ev) { return _ev.type !== ev; });
    };
    return Registry;
}());
exports.Registry = Registry;
/* -----------------------------------
 *
 * Function
 *
 * -------------------------------- */
function registry() {
    return new Registry();
}
exports.registry = registry;
},{}],5:[function(require,module,exports){
module.exports = require('./index').default;
},{"./index":6}],6:[function(require,module,exports){
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
},{"./event":3,"./utility":7}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var query_1 = require("./query");
exports.query = query_1.query;
},{"./query":8}],8:[function(require,module,exports){
"use strict";
/* -----------------------------------
 *
 * Variables
 *
 * -------------------------------- */
Object.defineProperty(exports, "__esModule", { value: true });
var regex = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/;
/* -----------------------------------
 *
 * Query
 *
 * -------------------------------- */
function query(qry, ctx) {
    var test;
    var match;
    if ((test = regex.exec(qry))) {
        if ((match = test[3])) {
            return ctx.getElementsByClassName(match);
        }
        if ((match = test[2])) {
            return ctx.getElementsByTagName(match);
        }
        if ((match = test[1])) {
            return document.getElementById(match);
        }
    }
    return ctx.querySelectorAll(qry);
}
exports.query = query;
},{}]},{},[5])(5)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvZXZlbnQvZGVsZWdhdGUudHMiLCJzcmMvZXZlbnQvZGlyZWN0LnRzIiwic3JjL2V2ZW50L2luZGV4LnRzIiwic3JjL2V2ZW50L3JlZ2lzdHJ5LnRzIiwic3JjL2luY2x1ZGUuanMiLCJzcmMvaW5kZXgudHMiLCJzcmMvdXRpbGl0eS9pbmRleC50cyIsInNyYy91dGlsaXR5L3F1ZXJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxrQ0FBb0M7QUFHcEM7Ozs7c0NBSXNDO0FBRXRDLGtCQUNHLEtBQWtCLEVBQ2xCLEtBQWEsRUFDYixFQUF3QztJQUd4QyxNQUFNLENBQUMsVUFBQyxFQUFTO1FBRWQsSUFBTSxTQUFTLEdBQUcsSUFBSSxnQkFBUSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUU3QyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDZCxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUM7UUFFaEIsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFBLEdBQUc7WUFFZixJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsTUFBYSxDQUFDO1lBRTVCLEVBQUUsQ0FBQSxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUVkLEdBQUcsR0FBRyxJQUFJLENBQUM7Z0JBQ1gsRUFBRSxHQUFHLElBQUksQ0FBQztnQkFFVixNQUFNLENBQUM7WUFFVixDQUFDO1lBRUQsT0FBTSxJQUFJLElBQUksSUFBSSxLQUFLLEtBQUssRUFBRSxDQUFDO2dCQUU1QixJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztnQkFFdkIsRUFBRSxDQUFBLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBRWQsR0FBRyxHQUFHLElBQUksQ0FBQztvQkFDWCxFQUFFLEdBQUcsSUFBSSxDQUFDO2dCQUViLENBQUM7WUFFSixDQUFDO1FBRUosQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBRU4sRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVkLENBQUM7SUFFSixDQUFDLENBQUM7QUFFTCxDQUFDO0FBU1EsNEJBQVE7OztBQ2pFakI7Ozs7c0NBSXNDOztBQUV0QyxnQkFDRyxFQUF3QztJQUd4QyxNQUFNLENBQUMsVUFBQyxFQUFTO1FBRWQsSUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLGFBQTRCLENBQUM7UUFFM0MsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUVkLENBQUMsQ0FBQztBQUVMLENBQUM7QUFTUSx3QkFBTTs7OztBQzdCZix1Q0FBc0M7QUFZbkMsbUJBWk0sbUJBQVEsQ0FZTjtBQVhYLG1DQUFrQztBQVkvQixpQkFaTSxlQUFNLENBWU47QUFYVCx1Q0FBc0M7QUFZbkMsbUJBWk0sbUJBQVEsQ0FZTjs7O0FDWlg7Ozs7c0NBSXNDOztBQTBCdEM7Ozs7c0NBSXNDO0FBRXRDO0lBTUc7UUFFRyxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUVsQixDQUFDO0lBR00sdUJBQUksR0FBWCxVQUFZLEVBQVU7UUFFWCxJQUFBLGdCQUFJLENBQVU7UUFFdEIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsSUFBSSxLQUFLLEVBQUUsRUFBZixDQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVqRCxDQUFDO0lBR00sc0JBQUcsR0FBVixVQUFXLEVBQVU7UUFFbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7SUFFckIsQ0FBQztJQUdNLHlCQUFNLEdBQWIsVUFBYyxFQUFVO1FBRWIsSUFBQSxnQkFBSSxDQUFVO1FBRXRCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxJQUFJLEtBQUssRUFBRSxFQUFmLENBQWUsQ0FBQyxDQUFDO0lBRW5ELENBQUM7SUFHSixlQUFDO0FBQUQsQ0F0Q0EsQUFzQ0MsSUFBQTtBQXRDWSw0QkFBUTtBQXlDckI7Ozs7c0NBSXNDO0FBRXRDO0lBRUcsTUFBTSxDQUFDLElBQUksUUFBUSxFQUFFLENBQUM7QUFFekIsQ0FBQztBQVNRLDRCQUFROztBQ2xHakI7Ozs7QUNBQSxtQ0FBcUM7QUFDckMsK0JBQWlDO0FBZWpDOzs7O3NDQUlzQztBQUV0QztJQVdHLGtCQUFtQixHQUF5QixFQUFFLEdBQWEsRUFBRSxJQUFZO1FBRXRFLElBQUksR0FBUSxDQUFDO1FBRWIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRS9CLEVBQUUsQ0FBQSxDQUFDLE9BQU8sR0FBRyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFFMUIsR0FBRyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVsRCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFFTCxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBRWIsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQUMsTUFBTSxDQUFDLElBQUksQ0FBQTtRQUVyQixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLENBQUMsSUFBSSxHQUFHLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztZQUV4QyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ2QsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7UUFFbEIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBRUwsR0FBRyxDQUFDLENBQ0QsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFDcEMsR0FBRyxFQUFFLEVBQ0wsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7Z0JBQ3RCLENBQUM7UUFFTCxDQUFDO0lBRUosQ0FBQztJQUdNLHVCQUFJLEdBQVgsVUFBWSxHQUFXO1FBRXBCLE1BQU0sQ0FBQyxJQUFJLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFFdEQsQ0FBQztJQUdNLDBCQUFPLEdBQWQsVUFBZSxHQUFXO1FBRXZCLElBQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUU3QyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLENBQUM7UUFFTixHQUFHLENBQUM7WUFFRCxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUVqQixPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUEsQ0FBQztZQUFBLENBQUM7UUFFL0MsQ0FBQyxRQUVFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUMsRUFFbkM7UUFFRixNQUFNLENBQUMsSUFBSSxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFM0IsQ0FBQztJQUdNLHVCQUFJLEdBQVgsVUFBWSxFQUE2QjtRQUV0QyxHQUFHLENBQUEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBRTFDLElBQUksRUFBRSxHQUFnQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFOUIsRUFBRSxDQUFBLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDdkMsS0FBSyxDQUFDO1lBQ1QsQ0FBQztRQUVKLENBQUM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBRWYsQ0FBQztJQUdNLHNCQUFHLEdBQVYsVUFBVyxHQUE4QjtRQUV0QyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQUEsRUFBRTtZQUVULEdBQUcsQ0FBQSxDQUFDLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBRWxCLElBQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFFckIsRUFBRSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBRWxDLENBQUM7UUFFSixDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFFZixDQUFDO0lBR00sdUJBQUksR0FBWCxVQUFZLEdBQThCO1FBRXZDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBQSxFQUFFO1lBRVQsR0FBRyxDQUFBLENBQUMsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFFbEIsSUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUVyQixFQUFFLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUU3QixDQUFDO1FBRUosQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBRWYsQ0FBQztJQUdNLDJCQUFRLEdBQWYsVUFBZ0IsR0FBVztRQUV4QixJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFFbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFBLEVBQUU7WUFFVCxJQUFNLEtBQUssR0FBRyxNQUFJLEdBQUcsTUFBRyxDQUFDO1lBQ3pCLElBQU0sS0FBSyxHQUFHLENBQUMsTUFBSSxFQUFFLENBQUMsU0FBUyxNQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBRTVELEVBQUUsQ0FBQSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUU1QixNQUFNLEdBQUcsSUFBSSxDQUFDO1lBRWpCLENBQUM7UUFFSixDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFFakIsQ0FBQztJQUdNLDJCQUFRLEdBQWYsVUFBZ0IsR0FBVztRQUEzQixpQkFjQztRQVpFLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBQSxFQUFFO1lBRVQsRUFBRSxDQUFBLENBQUMsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFdEIsRUFBRSxDQUFDLFNBQVMsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBRTdCLENBQUM7UUFFSixDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFFZixDQUFDO0lBR00sOEJBQVcsR0FBbEIsVUFBbUIsR0FBVztRQUE5QixpQkFnQkM7UUFkRSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQUEsRUFBRTtZQUVULEVBQUUsQ0FBQSxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVyQixJQUFJLEdBQUcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLFNBQVMsQ0FBQyxDQUFDO2dCQUVsRCxFQUFFLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUVoRCxDQUFDO1FBRUosQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBRWYsQ0FBQztJQUdNLDhCQUFXLEdBQWxCLFVBQW1CLEdBQVc7UUFFM0IsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFckIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUV6QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFFTCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXRCLENBQUM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBRWYsQ0FBQztJQUdNLHFCQUFFLEdBQVQsVUFBVSxFQUFVLEVBQUUsR0FBc0IsRUFBRSxHQUFjO1FBRWpELElBQUEsb0JBQU0sQ0FBVTtRQUV4QixJQUFNLE1BQU0sR0FBRyxPQUFPLEdBQUcsS0FBSyxVQUFVLElBQUksR0FBRyxLQUFLLFNBQVMsQ0FBQztRQUM5RCxJQUFNLFFBQVEsR0FBRyxPQUFPLEdBQUcsS0FBSyxRQUFRLElBQUksT0FBTyxHQUFHLEtBQUssVUFBVSxDQUFDO1FBRXRFLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFYixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQUEsRUFBRTtZQUVULElBQUksRUFBRSxHQUFHLElBQUksQ0FBQztZQUVkLEVBQUUsQ0FBQSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBRVQsRUFBRSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBZSxDQUFDLENBQUM7WUFFdEMsQ0FBQztZQUVELEVBQUUsQ0FBQSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBRVgsRUFBRSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLEdBQWEsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUUvQyxDQUFDO1lBRUQsRUFBRSxDQUFBLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFFTCxFQUFFLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFFbEMsTUFBTSxDQUFDLEdBQUcsQ0FBQztvQkFDUixJQUFJLEVBQUUsRUFBRTtvQkFDUixPQUFPLEVBQUUsRUFBRTtpQkFDYixDQUFDLENBQUM7WUFFTixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRUwsTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1lBRWxELENBQUM7UUFFSixDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFFZixDQUFDO0lBR00sc0JBQUcsR0FBVixVQUFXLEVBQVU7UUFFVixJQUFBLG9CQUFNLENBQVU7UUFFeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFBLEVBQUU7WUFFVCxJQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRS9CLEVBQUUsQ0FBQSxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUV2QixFQUFFLENBQUMsbUJBQW1CLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFcEQsQ0FBQztRQUVKLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVsQixNQUFNLENBQUMsSUFBSSxDQUFDO0lBRWYsQ0FBQztJQUdNLHVCQUFJLEdBQVgsVUFBWSxHQUFZO1FBRXJCLEVBQUUsQ0FBQSxDQUFDLEdBQUcsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBRW5CLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBRTVCLENBQUM7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQUEsRUFBRTtZQUVULEVBQUUsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO1FBRXRCLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUVkLENBQUM7SUFHTSx1QkFBSSxHQUFYLFVBQVksR0FBVyxFQUFFLEdBQVk7UUFFbEMsRUFBRSxDQUFBLENBQUMsR0FBRyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFFbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsVUFBUSxHQUFLLENBQUMsQ0FBQztRQUU5QyxDQUFDO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFBLEVBQUU7WUFFVCxFQUFFLENBQUMsWUFBWSxDQUFDLFVBQVEsR0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRXZDLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUVkLENBQUM7SUFHTSx1QkFBSSxHQUFYLFVBQVksR0FBWTtRQUVyQixFQUFFLENBQUEsQ0FBQyxHQUFHLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQztZQUVuQixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUU1QixDQUFDO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFBLEVBQUU7WUFFVCxFQUFFLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztRQUV0QixDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFFZCxDQUFDO0lBR00seUJBQU0sR0FBYixVQUFjLElBQWlDO1FBRTVDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBQSxFQUFFO1lBRVQsRUFBRSxDQUFBLENBQUMsT0FBTyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFFM0IsTUFBTSxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFbkQsQ0FBQztZQUVELEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFeEIsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBRWYsQ0FBQztJQUdNLDBCQUFPLEdBQWQsVUFBZSxJQUFpQztRQUU3QyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQUEsRUFBRTtZQUVULEVBQUUsQ0FBQSxDQUFDLE9BQU8sSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBRTNCLE1BQU0sQ0FBQyxFQUFFLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRXBELENBQUM7WUFFRCxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFeEMsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBRWYsQ0FBQztJQUdNLHdCQUFLLEdBQVo7UUFFRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQUEsRUFBRTtZQUVULE9BQU8sRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUVwQixFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUVqQyxDQUFDO1FBRUosQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBRWYsQ0FBQztJQUdNLHlCQUFNLEdBQWI7UUFFRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQUEsRUFBRTtZQUVULEVBQUUsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRWpDLENBQUMsQ0FBQyxDQUFDO0lBRU4sQ0FBQztJQUdNLDBCQUFPLEdBQWQ7UUFFRyxJQUFNLEtBQUssR0FBa0IsRUFBRSxDQUFDO1FBRWhDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBQSxFQUFFO1lBRVQsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVsQixDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFFaEIsQ0FBQztJQUdKLGVBQUM7QUFBRCxDQWphQSxBQWlhQyxJQUFBO0FBamFZLDRCQUFRO0FBcWJyQjs7OztzQ0FJc0M7QUFFdEMsa0JBQWUsVUFBQyxHQUF5QixFQUFFLEdBQWlCLElBQUssT0FBQSxJQUFJLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQXRCLENBQXNCLENBQUM7Ozs7QUNqZHhGLGlDQUFnQztBQVU3QixnQkFWTSxhQUFLLENBVU47OztBQ1JSOzs7O3NDQUlzQzs7QUFFdEMsSUFBTSxLQUFLLEdBQUcsa0NBQWtDLENBQUM7QUFHakQ7Ozs7c0NBSXNDO0FBRXRDLGVBQ0csR0FBVyxFQUNYLEdBQXVCO0lBR3ZCLElBQUksSUFBSSxDQUFDO0lBQ1QsSUFBSSxLQUFLLENBQUM7SUFFVixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTVCLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVyQixNQUFNLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTVDLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFckIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUxQyxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXJCLE1BQU0sQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXpDLENBQUM7SUFFSixDQUFDO0lBRUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUVwQyxDQUFDO0FBU1Esc0JBQUsiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHsgSW5zdGFuY2UgfSBmcm9tICcuLi9pbmRleCc7XHJcblxyXG5cclxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICpcclxuICogRGVsZWdhdGVcclxuICpcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuXHJcbmZ1bmN0aW9uIGRlbGVnYXRlKFxyXG4gICBzY29wZTogSFRNTEVsZW1lbnQsXHJcbiAgIHF1ZXJ5OiBzdHJpbmcsXHJcbiAgIGNiOiAoZXY6IEV2ZW50LCBlbDogSFRNTEVsZW1lbnQpID0+IHZvaWRcclxuKSB7XHJcblxyXG4gICByZXR1cm4gKGV2OiBFdmVudCkgPT4ge1xyXG4gICAgICBcclxuICAgICAgY29uc3QgJGVsZW1lbnRzID0gbmV3IEluc3RhbmNlKHF1ZXJ5LCBzY29wZSk7XHJcblxyXG4gICAgICBsZXQgZWwgPSBudWxsO1xyXG4gICAgICBsZXQgaGl0ID0gZmFsc2U7XHJcblxyXG4gICAgICAkZWxlbWVudHMuZWFjaChfZWwgPT4ge1xyXG5cclxuICAgICAgICAgbGV0IHRlc3QgPSBldi50YXJnZXQgYXMgYW55O1xyXG5cclxuICAgICAgICAgaWYodGVzdCA9PSBfZWwpIHtcclxuXHJcbiAgICAgICAgICAgIGhpdCA9IHRydWU7XHJcbiAgICAgICAgICAgIGVsID0gdGVzdDtcclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgIH1cclxuXHJcbiAgICAgICAgIHdoaWxlKHRlc3QgJiYgdGVzdCAhPT0gc2NvcGUpIHtcclxuXHJcbiAgICAgICAgICAgIHRlc3QgPSB0ZXN0LnBhcmVudE5vZGU7XHJcblxyXG4gICAgICAgICAgICBpZih0ZXN0ID09IF9lbCkge1xyXG5cclxuICAgICAgICAgICAgICAgaGl0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgZWwgPSB0ZXN0O1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgfVxyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZihoaXQpIHtcclxuICAgICAgICAgXHJcbiAgICAgICAgIGNiKGV2LCBlbCk7XHJcblxyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICB9O1xyXG5cclxufVxyXG5cclxuXHJcbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqXHJcbiAqIEV4cG9ydFxyXG4gKlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG5cclxuZXhwb3J0IHsgZGVsZWdhdGUgfTsiLCJcclxuXHJcbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqXHJcbiAqIERpcmVjdFxyXG4gKlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG5cclxuZnVuY3Rpb24gZGlyZWN0KFxyXG4gICBjYjogKGV2OiBFdmVudCwgZWw6IEhUTUxFbGVtZW50KSA9PiB2b2lkXHJcbikge1xyXG5cclxuICAgcmV0dXJuIChldjogRXZlbnQpID0+IHtcclxuICAgICAgXHJcbiAgICAgIGNvbnN0IGVsID0gZXYuY3VycmVudFRhcmdldCBhcyBIVE1MRWxlbWVudDtcclxuXHJcbiAgICAgIGNiKGV2LCBlbCk7XHJcbiAgICAgIFxyXG4gICB9O1xyXG5cclxufVxyXG5cclxuXHJcbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqXHJcbiAqIEV4cG9ydFxyXG4gKlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG5cclxuZXhwb3J0IHsgZGlyZWN0IH07IiwiaW1wb3J0IHsgcmVnaXN0cnkgfSBmcm9tICcuL3JlZ2lzdHJ5JztcclxuaW1wb3J0IHsgZGlyZWN0IH0gZnJvbSAnLi9kaXJlY3QnO1xyXG5pbXBvcnQgeyBkZWxlZ2F0ZSB9IGZyb20gJy4vZGVsZWdhdGUnO1xyXG5cclxuXHJcbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqXHJcbiAqIEV2ZW50c1xyXG4gKlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG5cclxuZXhwb3J0IHtcclxuICAgcmVnaXN0cnksXHJcbiAgIGRpcmVjdCxcclxuICAgZGVsZWdhdGVcclxufTsiLCJcclxuXHJcbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqXHJcbiAqIElFdmVudHNcclxuICpcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuXHJcbmV4cG9ydCB0eXBlIElFdmVudHMgPSBSZWdpc3RyeTtcclxuXHJcblxyXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKlxyXG4gKiBJRXZlbnRcclxuICpcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUV2ZW50IHtcclxuICAgdHlwZTogc3RyaW5nO1xyXG4gICBoYW5kbGVyOiBFdmVudExpc3RlbmVyO1xyXG59XHJcblxyXG5cclxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICpcclxuICogSUhhbmRsZXJcclxuICpcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuXHJcbmV4cG9ydCB0eXBlIElIYW5kbGVyID0gKGV2OiBFdmVudCwgZWw6IEhUTUxFbGVtZW50KSA9PiB2b2lkO1xyXG5cclxuXHJcbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqXHJcbiAqIFJlZ2lzdHJ5XHJcbiAqXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcblxyXG5leHBvcnQgY2xhc3MgUmVnaXN0cnkge1xyXG5cclxuXHJcbiAgIHByaXZhdGUgbGlzdDogSUV2ZW50W107XHJcblxyXG5cclxuICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgICAgdGhpcy5saXN0ID0gW107XHJcblxyXG4gICB9XHJcblxyXG5cclxuICAgcHVibGljIGZpbmQoZXY6IHN0cmluZykge1xyXG5cclxuICAgICAgY29uc3QgeyBsaXN0IH0gPSB0aGlzO1xyXG5cclxuICAgICAgcmV0dXJuIGxpc3QuZmlsdGVyKF9ldiA9PiBfZXYudHlwZSA9PT0gZXYpWzBdO1xyXG5cclxuICAgfVxyXG5cclxuXHJcbiAgIHB1YmxpYyBhZGQoZXY6IElFdmVudCkge1xyXG5cclxuICAgICAgdGhpcy5saXN0LnB1c2goZXYpXHJcblxyXG4gICB9XHJcblxyXG5cclxuICAgcHVibGljIHJlbW92ZShldjogc3RyaW5nKSB7XHJcblxyXG4gICAgICBjb25zdCB7IGxpc3QgfSA9IHRoaXM7XHJcblxyXG4gICAgICB0aGlzLmxpc3QgPSBsaXN0LmZpbHRlcihfZXYgPT4gX2V2LnR5cGUgIT09IGV2KTtcclxuXHJcbiAgIH1cclxuXHJcblxyXG59XHJcblxyXG5cclxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICpcclxuICogRnVuY3Rpb25cclxuICpcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuXHJcbmZ1bmN0aW9uIHJlZ2lzdHJ5KCkge1xyXG5cclxuICAgcmV0dXJuIG5ldyBSZWdpc3RyeSgpO1xyXG5cclxufVxyXG5cclxuXHJcbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqXHJcbiAqIEV4cG9ydFxyXG4gKlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG5cclxuZXhwb3J0IHsgcmVnaXN0cnkgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vaW5kZXgnKS5kZWZhdWx0OyIsImltcG9ydCAqIGFzIHV0aWxpdHkgZnJvbSAnLi91dGlsaXR5JztcclxuaW1wb3J0ICogYXMgZXZlbnQgZnJvbSAnLi9ldmVudCc7XHJcbmltcG9ydCB7IElIYW5kbGVyLCBJRXZlbnRzIH0gZnJvbSAnLi9ldmVudC9yZWdpc3RyeSc7XHJcblxyXG5cclxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICpcclxuICogSU1ldGFcclxuICpcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU1ldGEge1xyXG4gICBvd25lcj86IEluc3RhbmNlO1xyXG59XHJcblxyXG5cclxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICpcclxuICogSW5zdGFuY2VcclxuICpcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBJbnN0YW5jZSB7XHJcbiAgIFxyXG4gICBcclxuICAgW2luZGV4OiBudW1iZXJdOiBIVE1MRWxlbWVudDtcclxuXHJcblxyXG4gICBwdWJsaWMgbGVuZ3RoOiBudW1iZXI7XHJcbiAgIHB1YmxpYyBldmVudHM6IElFdmVudHM7XHJcbiAgIHByaXZhdGUgbWV0YTogSU1ldGE7XHJcblxyXG5cclxuICAgcHVibGljIGNvbnN0cnVjdG9yKHFyeTogc3RyaW5nIHwgSFRNTEVsZW1lbnQsIGN0eD86IEVsZW1lbnQsIG1ldGE/OiBJTWV0YSkge1xyXG5cclxuICAgICAgbGV0IGVsczogYW55O1xyXG5cclxuICAgICAgdGhpcy5tZXRhID0gbWV0YSB8fCB7fTtcclxuICAgICAgdGhpcy5ldmVudHMgPSBldmVudC5yZWdpc3RyeSgpO1xyXG5cclxuICAgICAgaWYodHlwZW9mIHFyeSA9PT0gJ3N0cmluZycpIHtcclxuXHJcbiAgICAgICAgIGVscyA9IHV0aWxpdHkucXVlcnkocXJ5LCBjdHggPyBjdHggOiBkb2N1bWVudCk7XHJcblxyXG4gICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgZWxzID0gcXJ5O1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFlbHMpIHJldHVybiB0aGlzXHJcblxyXG4gICAgICBpZiAoZWxzLm5vZGVUeXBlID09PSAxIHx8IGVscyA9PT0gd2luZG93KSB7XHJcbiAgICAgICAgIFxyXG4gICAgICAgICB0aGlzWzBdID0gZWxzO1xyXG4gICAgICAgICB0aGlzLmxlbmd0aCA9IDFcclxuICAgICAgXHJcbiAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICBmb3IgKFxyXG4gICAgICAgICAgICBsZXQgbGVuID0gKHRoaXMubGVuZ3RoID0gZWxzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIGxlbi0tO1xyXG4gICAgICAgICAgICB0aGlzW2xlbl0gPSBlbHNbbGVuXVxyXG4gICAgICAgICApO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgfVxyXG5cclxuXHJcbiAgIHB1YmxpYyBmaW5kKHFyeTogc3RyaW5nKSB7XHJcbiAgICAgIFxyXG4gICAgICByZXR1cm4gbmV3IEluc3RhbmNlKHFyeSwgdGhpc1swXSwgeyBvd25lcjogdGhpcyB9KTtcclxuXHJcbiAgIH1cclxuXHJcblxyXG4gICBwdWJsaWMgY2xvc2VzdChxcnk6IHN0cmluZykge1xyXG5cclxuICAgICAgY29uc3QgbWF0Y2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHFyeSk7XHJcbiAgICAgIFxyXG4gICAgICBsZXQgZWwgPSB0aGlzWzBdO1xyXG4gICAgICBsZXQgaTtcclxuICAgXHJcbiAgICAgIGRvIHtcclxuICAgXHJcbiAgICAgICAgIGkgPSBtYXRjaC5sZW5ndGg7XHJcbiAgIFxyXG4gICAgICAgICB3aGlsZSAoLS1pID49IDAgJiYgbWF0Y2guaXRlbShpKSAhPT0gZWwpIHt9O1xyXG4gICBcclxuICAgICAgfSB3aGlsZSAoXHJcbiAgIFxyXG4gICAgICAgICAoaSA8IDApICYmIChlbCA9IGVsLnBhcmVudEVsZW1lbnQpXHJcbiAgICAgICAgIFxyXG4gICAgICApO1xyXG4gICAgICBcclxuICAgICAgcmV0dXJuIG5ldyBJbnN0YW5jZShlbCk7XHJcblxyXG4gICB9XHJcblxyXG5cclxuICAgcHVibGljIGVhY2goY2I6IChlbDogSFRNTEVsZW1lbnQpID0+IHZvaWQpIHtcclxuXHJcbiAgICAgIGZvcihsZXQgaSA9IDAsIGxlbiA9IHRoaXMubGVuZ3RoOyBpIDwgbGVuOykge1xyXG4gICAgICAgICBcclxuICAgICAgICAgbGV0IGVsOiBIVE1MRWxlbWVudCA9IHRoaXNbaV07XHJcbiAgIFxyXG4gICAgICAgICBpZihjYi5jYWxsKHRoaXMsIHRoaXNbaV0sIGkrKykgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgIH1cclxuICAgXHJcbiAgICAgIH1cclxuICAgXHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG5cclxuICAgfVxyXG5cclxuXHJcbiAgIHB1YmxpYyBjc3Mob2JqOiB7W2luZGV4OiBzdHJpbmddOiBzdHJpbmd9KSB7XHJcblxyXG4gICAgICB0aGlzLmVhY2goZWwgPT4ge1xyXG4gICAgICAgICBcclxuICAgICAgICAgZm9yKGxldCBrZXkgaW4gb2JqKSB7XHJcbiAgIFxyXG4gICAgICAgICAgICBjb25zdCB2YWwgPSBvYmpba2V5XTtcclxuICAgXHJcbiAgICAgICAgICAgIGVsLnN0eWxlLnNldFByb3BlcnR5KGtleSwgdmFsKTtcclxuICAgXHJcbiAgICAgICAgIH1cclxuICAgXHJcbiAgICAgIH0pO1xyXG4gICBcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICB9XHJcblxyXG5cclxuICAgcHVibGljIGF0dHIob2JqOiB7W2luZGV4OiBzdHJpbmddOiBzdHJpbmd9KSB7XHJcblxyXG4gICAgICB0aGlzLmVhY2goZWwgPT4ge1xyXG4gICAgICAgICBcclxuICAgICAgICAgZm9yKGxldCBrZXkgaW4gb2JqKSB7XHJcbiAgIFxyXG4gICAgICAgICAgICBjb25zdCB2YWwgPSBvYmpba2V5XTtcclxuICAgXHJcbiAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZShrZXksIHZhbCk7XHJcbiAgIFxyXG4gICAgICAgICB9XHJcbiAgIFxyXG4gICAgICB9KTtcclxuICAgXHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG5cclxuICAgfVxyXG5cclxuXHJcbiAgIHB1YmxpYyBoYXNDbGFzcyhzdHI6IHN0cmluZykge1xyXG5cclxuICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xyXG4gICAgICBcclxuICAgICAgdGhpcy5lYWNoKGVsID0+IHtcclxuICAgXHJcbiAgICAgICAgIGNvbnN0IHZhbHVlID0gYCAke3N0cn0gYDtcclxuICAgICAgICAgY29uc3QgY2xlYW4gPSAoYCAke2VsLmNsYXNzTmFtZX0gYCkucmVwbGFjZSgvW1xcblxcdF0vZywgJyAnKTtcclxuICAgXHJcbiAgICAgICAgIGlmKGNsZWFuLmluZGV4T2YodmFsdWUpID4gLTEpIHtcclxuICAgXHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XHJcbiAgIFxyXG4gICAgICAgICB9XHJcbiAgIFxyXG4gICAgICB9KTtcclxuICAgXHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcblxyXG4gICB9XHJcblxyXG5cclxuICAgcHVibGljIGFkZENsYXNzKHN0cjogc3RyaW5nKSB7XHJcblxyXG4gICAgICB0aGlzLmVhY2goZWwgPT4ge1xyXG4gICAgICAgICBcclxuICAgICAgICAgaWYoIXRoaXMuaGFzQ2xhc3Moc3RyKSkge1xyXG4gICBcclxuICAgICAgICAgICAgZWwuY2xhc3NOYW1lICs9ICcgJyArIHN0cjtcclxuICAgXHJcbiAgICAgICAgIH1cclxuICAgXHJcbiAgICAgIH0pO1xyXG4gICBcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICB9XHJcblxyXG5cclxuICAgcHVibGljIHJlbW92ZUNsYXNzKHN0cjogc3RyaW5nKSB7XHJcblxyXG4gICAgICB0aGlzLmVhY2goZWwgPT4ge1xyXG4gICAgICAgICBcclxuICAgICAgICAgaWYodGhpcy5oYXNDbGFzcyhzdHIpKSB7XHJcbiAgIFxyXG4gICAgICAgICAgICB2YXIgcmVnID0gbmV3IFJlZ0V4cCgnKFxcXFxzfF4pJyArIHN0ciArICcoXFxcXHN8JCknKTtcclxuICAgXHJcbiAgICAgICAgICAgIGVsLmNsYXNzTmFtZSA9IGVsLmNsYXNzTmFtZS5yZXBsYWNlKHJlZywgJycpO1xyXG4gICBcclxuICAgICAgICAgfVxyXG4gICBcclxuICAgICAgfSk7XHJcbiAgIFxyXG4gICAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgIH1cclxuXHJcblxyXG4gICBwdWJsaWMgdG9nZ2xlQ2xhc3Moc3RyOiBzdHJpbmcpIHtcclxuXHJcbiAgICAgIGlmKHRoaXMuaGFzQ2xhc3Moc3RyKSkge1xyXG4gICAgICAgICBcclxuICAgICAgICAgdGhpcy5yZW1vdmVDbGFzcyhzdHIpO1xyXG4gICBcclxuICAgICAgfSBlbHNlIHtcclxuICAgXHJcbiAgICAgICAgIHRoaXMuYWRkQ2xhc3Moc3RyKTtcclxuICAgXHJcbiAgICAgIH1cclxuICAgXHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG5cclxuICAgfVxyXG5cclxuXHJcbiAgIHB1YmxpYyBvbihldjogc3RyaW5nLCBvcDE6IHN0cmluZyB8IElIYW5kbGVyLCBvcDI/OiBJSGFuZGxlcikge1xyXG5cclxuICAgICAgY29uc3QgeyBldmVudHMgfSA9IHRoaXM7XHJcbiAgICAgIFxyXG4gICAgICBjb25zdCBkaXJlY3QgPSB0eXBlb2Ygb3AxID09PSAnZnVuY3Rpb24nICYmIG9wMiA9PT0gdW5kZWZpbmVkO1xyXG4gICAgICBjb25zdCBkZWxlZ2F0ZSA9IHR5cGVvZiBvcDEgPT09ICdzdHJpbmcnICYmIHR5cGVvZiBvcDIgPT09ICdmdW5jdGlvbic7XHJcbiAgIFxyXG4gICAgICB0aGlzLm9mZihldik7XHJcbiAgIFxyXG4gICAgICB0aGlzLmVhY2goZWwgPT4ge1xyXG4gICBcclxuICAgICAgICAgbGV0IGNiID0gbnVsbDtcclxuICAgXHJcbiAgICAgICAgIGlmKGRpcmVjdCkge1xyXG4gICBcclxuICAgICAgICAgICAgY2IgPSBldmVudC5kaXJlY3Qob3AxIGFzIElIYW5kbGVyKTtcclxuICAgXHJcbiAgICAgICAgIH1cclxuICAgXHJcbiAgICAgICAgIGlmKGRlbGVnYXRlKSB7XHJcbiAgIFxyXG4gICAgICAgICAgICBjYiA9IGV2ZW50LmRlbGVnYXRlKGVsLCBvcDEgYXMgc3RyaW5nLCBvcDIpO1xyXG4gICBcclxuICAgICAgICAgfVxyXG4gICBcclxuICAgICAgICAgaWYoY2IpIHtcclxuICAgXHJcbiAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoZXYsIGNiLCB0cnVlKTtcclxuICAgXHJcbiAgICAgICAgICAgIGV2ZW50cy5hZGQoe1xyXG4gICAgICAgICAgICAgICB0eXBlOiBldixcclxuICAgICAgICAgICAgICAgaGFuZGxlcjogY2JcclxuICAgICAgICAgICAgfSk7XHJcbiAgIFxyXG4gICAgICAgICB9IGVsc2Uge1xyXG4gICBcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUU0RvbS5vbjogSW52YWxpZCBBcmd1bWVudHMnKTtcclxuICAgXHJcbiAgICAgICAgIH1cclxuICAgXHJcbiAgICAgIH0pO1xyXG4gICBcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICB9XHJcblxyXG5cclxuICAgcHVibGljIG9mZihldjogc3RyaW5nKSB7XHJcblxyXG4gICAgICBjb25zdCB7IGV2ZW50cyB9ID0gdGhpczsgXHJcblxyXG4gICAgICB0aGlzLmVhY2goZWwgPT4ge1xyXG4gICBcclxuICAgICAgICAgY29uc3QgYWN0aXZlID0gZXZlbnRzLmZpbmQoZXYpO1xyXG4gICBcclxuICAgICAgICAgaWYoYWN0aXZlICE9PSB1bmRlZmluZWQpIHtcclxuICAgXHJcbiAgICAgICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXYsIGFjdGl2ZS5oYW5kbGVyLCB0cnVlKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgIH1cclxuICAgXHJcbiAgICAgIH0pO1xyXG4gICBcclxuICAgICAgZXZlbnRzLnJlbW92ZShldik7XHJcbiAgIFxyXG4gICAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgIH1cclxuXHJcblxyXG4gICBwdWJsaWMgdGV4dCh2YWw/OiBzdHJpbmcpIHtcclxuXHJcbiAgICAgIGlmKHZhbCA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgXHJcbiAgICAgICAgIHJldHVybiB0aGlzWzBdLmlubmVyVGV4dDtcclxuICAgXHJcbiAgICAgIH1cclxuICAgXHJcbiAgICAgIHRoaXMuZWFjaChlbCA9PiB7XHJcbiAgICAgICAgIFxyXG4gICAgICAgICBlbC5pbm5lckhUTUwgPSB2YWw7XHJcbiAgIFxyXG4gICAgICB9KTtcclxuICAgXHJcbiAgICAgIHJldHVybiB2YWw7XHJcblxyXG4gICB9XHJcblxyXG5cclxuICAgcHVibGljIGRhdGEoa2V5OiBzdHJpbmcsIHZhbD86IHN0cmluZykge1xyXG4gICAgICBcclxuICAgICAgaWYodmFsID09IHVuZGVmaW5lZCkge1xyXG5cclxuICAgICAgICAgcmV0dXJuIHRoaXNbMF0uZ2V0QXR0cmlidXRlKGBkYXRhLSR7a2V5fWApO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5lYWNoKGVsID0+IHtcclxuXHJcbiAgICAgICAgIGVsLnNldEF0dHJpYnV0ZShgZGF0YS0ke2tleX1gLCB2YWwpO1xyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gdmFsO1xyXG4gICAgICBcclxuICAgfVxyXG5cclxuXHJcbiAgIHB1YmxpYyBodG1sKHZhbD86IHN0cmluZykge1xyXG5cclxuICAgICAgaWYodmFsID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICBcclxuICAgICAgICAgcmV0dXJuIHRoaXNbMF0uaW5uZXJIVE1MO1xyXG4gICBcclxuICAgICAgfVxyXG4gICBcclxuICAgICAgdGhpcy5lYWNoKGVsID0+IHtcclxuICAgXHJcbiAgICAgICAgIGVsLmlubmVySFRNTCA9IHZhbDtcclxuICAgXHJcbiAgICAgIH0pO1xyXG4gICBcclxuICAgICAgcmV0dXJuIHZhbDtcclxuXHJcbiAgIH1cclxuXHJcblxyXG4gICBwdWJsaWMgYXBwZW5kKGl0ZW06IHN0cmluZyB8IE5vZGUgfCBIVE1MRWxlbWVudCkge1xyXG5cclxuICAgICAgdGhpcy5lYWNoKGVsID0+IHtcclxuICAgICAgICAgXHJcbiAgICAgICAgIGlmKHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJykge1xyXG4gICBcclxuICAgICAgICAgICAgcmV0dXJuIGVsLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgaXRlbSk7XHJcbiAgIFxyXG4gICAgICAgICB9XHJcbiAgIFxyXG4gICAgICAgICBlbC5hcHBlbmRDaGlsZChpdGVtKTtcclxuICAgXHJcbiAgICAgIH0pO1xyXG4gICBcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICB9XHJcblxyXG5cclxuICAgcHVibGljIHByZXBlbmQoaXRlbTogc3RyaW5nIHwgTm9kZSB8IEhUTUxFbGVtZW50KSB7XHJcblxyXG4gICAgICB0aGlzLmVhY2goZWwgPT4ge1xyXG4gICAgICAgICBcclxuICAgICAgICAgaWYodHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnKSB7XHJcbiAgIFxyXG4gICAgICAgICAgICByZXR1cm4gZWwuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgaXRlbSk7XHJcbiAgIFxyXG4gICAgICAgICB9XHJcbiAgIFxyXG4gICAgICAgICBlbC5pbnNlcnRCZWZvcmUoaXRlbSwgZWwuZmlyc3RDaGlsZCk7XHJcbiAgIFxyXG4gICAgICB9KTtcclxuICAgXHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG5cclxuICAgfVxyXG5cclxuXHJcbiAgIHB1YmxpYyBlbXB0eSgpIHtcclxuXHJcbiAgICAgIHRoaXMuZWFjaChlbCA9PiB7XHJcbiAgICAgICAgIFxyXG4gICAgICAgICB3aGlsZSAoZWwuZmlyc3RDaGlsZCkge1xyXG4gICBcclxuICAgICAgICAgICAgZWwucmVtb3ZlQ2hpbGQoZWwuZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgIFxyXG4gICAgICAgICB9XHJcbiAgIFxyXG4gICAgICB9KTtcclxuICAgXHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG5cclxuICAgfVxyXG5cclxuXHJcbiAgIHB1YmxpYyByZW1vdmUoKSB7XHJcblxyXG4gICAgICB0aGlzLmVhY2goZWwgPT4ge1xyXG4gICAgICAgICBcclxuICAgICAgICAgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XHJcbiAgIFxyXG4gICAgICB9KTtcclxuXHJcbiAgIH1cclxuXHJcblxyXG4gICBwdWJsaWMgdG9BcnJheSgpIHtcclxuXHJcbiAgICAgIGNvbnN0IGFycmF5OiBIVE1MRWxlbWVudFtdID0gW107XHJcbiAgICAgIFxyXG4gICAgICB0aGlzLmVhY2goZWwgPT4ge1xyXG4gICBcclxuICAgICAgICAgYXJyYXkucHVzaChlbCk7XHJcbiAgIFxyXG4gICAgICB9KTtcclxuICAgXHJcbiAgICAgIHJldHVybiBhcnJheTtcclxuXHJcbiAgIH1cclxuXHJcbiAgIFxyXG59XHJcblxyXG5cclxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICpcclxuICogTmFtZXNwYWNlXHJcbiAqXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcblxyXG5leHBvcnQgZGVjbGFyZSBuYW1lc3BhY2UgVFNEb20ge1xyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSW5pdCB7XHJcbiAgICAgICAgKHFyeTogc3RyaW5nIHwgSFRNTEVsZW1lbnQsIGN0eD86IEVsZW1lbnQsIG1ldGE/OiBJTWV0YSk6IEluc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBPYmplY3QgZXh0ZW5kcyBJbnN0YW5jZSB7fVxyXG5cclxufVxyXG5cclxuXHJcbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqXHJcbiAqIENvbnN0cnVjdG9yXHJcbiAqXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCAocXJ5OiBzdHJpbmcgfCBIVE1MRWxlbWVudCwgY3R4PzogSFRNTEVsZW1lbnQpID0+IG5ldyBJbnN0YW5jZShxcnksIGN0eCk7IiwiaW1wb3J0IHsgcXVlcnkgfSBmcm9tICcuL3F1ZXJ5JztcclxuXHJcblxyXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKlxyXG4gKiBFdmVudHNcclxuICpcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuXHJcbmV4cG9ydCB7XHJcbiAgIHF1ZXJ5XHJcbn07IiwiXHJcblxyXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKlxyXG4gKiBWYXJpYWJsZXNcclxuICpcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuXHJcbmNvbnN0IHJlZ2V4ID0gL14oPzojKFtcXHctXSspfChcXHcrKXxcXC4oW1xcdy1dKykpJC87XHJcblxyXG5cclxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICpcclxuICogUXVlcnlcclxuICpcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuXHJcbmZ1bmN0aW9uIHF1ZXJ5KFxyXG4gICBxcnk6IHN0cmluZywgXHJcbiAgIGN0eDogRWxlbWVudCB8IERvY3VtZW50XHJcbikge1xyXG5cclxuICAgbGV0IHRlc3Q7XHJcbiAgIGxldCBtYXRjaDtcclxuXHJcbiAgIGlmICgodGVzdCA9IHJlZ2V4LmV4ZWMocXJ5KSkpIHtcclxuXHJcbiAgICAgIGlmICgobWF0Y2ggPSB0ZXN0WzNdKSkge1xyXG5cclxuICAgICAgICAgcmV0dXJuIGN0eC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKG1hdGNoKTtcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICgobWF0Y2ggPSB0ZXN0WzJdKSkge1xyXG5cclxuICAgICAgICAgcmV0dXJuIGN0eC5nZXRFbGVtZW50c0J5VGFnTmFtZShtYXRjaCk7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoKG1hdGNoID0gdGVzdFsxXSkpIHtcclxuXHJcbiAgICAgICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChtYXRjaCk7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICB9XHJcblxyXG4gICByZXR1cm4gY3R4LnF1ZXJ5U2VsZWN0b3JBbGwocXJ5KTtcclxuXHJcbn1cclxuXHJcblxyXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKlxyXG4gKiBFeHBvcnRcclxuICpcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuXHJcbmV4cG9ydCB7IHF1ZXJ5IH07Il19

//# sourceMappingURL=tsdom.inc.js.map
