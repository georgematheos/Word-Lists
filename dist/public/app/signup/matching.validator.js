"use strict";
/**
* If the value of the given control does not match the value of the control
* with the name of secondControlName in the FormGroup that the control is a part of,
* this marks the error 'mismatch' as true on the given control if reverse is false,
* and on the control named secondControlName if reverse is true.
*/
function matching(secondControlName, reverse) {
    if (reverse === void 0) { reverse = false; }
    return function (control) {
        var controlRoot = control.root;
        if (!controlRoot) {
            console.log('ERROR: No control root found.');
            return null;
        }
        var control2 = controlRoot.get(secondControlName);
        if (!control2) {
            console.log('ERROR: No control with provided name on the control root.');
            return null;
        }
        // if this is not the reverse, and the control and control2 do not have the same value, add an error
        if (control.value !== control2.value && !reverse) {
            return { mismatch: true };
        }
        // if they are equal, and this is the reverse, remove the mismatch error if it exists
        if (control.value === control2.value && reverse) {
            delete control2.errors['mismatch'];
            if (control2.errors && !Object.keys(control2.errors).length) {
                control2.setErrors(null);
            }
        }
        // if this is the reverse, set the mismatch on control2 to true
        if (control.value !== control2.value && reverse) {
            if (control2.errors) {
                control2.errors['mismatch'] = true;
            }
            else {
                control2.setErrors({ mismatch: true });
            }
        }
        return null;
    };
}
exports.matching = matching;
//# sourceMappingURL=matching.validator.js.map