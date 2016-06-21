"use strict";
/**
* If the value of the control named firstControlName does not match the one named
* secondControlName, returns the error object { mismatch: true }.
*/
function matching(firstControlName, secondControlName) {
    return function (group) {
        var control1 = group.controls[firstControlName];
        var control2 = group.controls[secondControlName];
        if (control1.value !== control2.value) {
            return { mismatch: true };
        }
    };
}
exports.matching = matching;
//# sourceMappingURL=matching.validator.js.map