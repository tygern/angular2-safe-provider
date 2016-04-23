"use strict";
var core_1 = require("angular2/core");
function safeProvider(token) {
    return function setClass(Klass) {
        return core_1.provide(token, { useClass: Klass });
    };
}
exports.safeProvider = safeProvider;
//# sourceMappingURL=index.js.map