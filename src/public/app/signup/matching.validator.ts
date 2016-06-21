import { Control, ControlGroup } from '@angular/common';

/**
* If the value of the control named firstControlName does not match the one named
* secondControlName, returns the error object { mismatch: true }.
*/
export function matching(firstControlName, secondControlName) {
    return (group: ControlGroup) => {
        let control1 = group.controls[firstControlName];
        let control2 = group.controls[secondControlName];
        if (control1.value !== control2.value) {
            return { mismatch: true };
        }
    }
}
