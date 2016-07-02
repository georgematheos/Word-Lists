// this type is for a container object for any other object
export class Capsule<t> {
    item: t;

    constructor(item: t) {
        this.item = item;
    }
}
