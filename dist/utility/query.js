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
