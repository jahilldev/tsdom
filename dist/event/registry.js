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
        return list.filter(function (_ev) { return _ev.type === ev; });
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
