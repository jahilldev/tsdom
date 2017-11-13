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
