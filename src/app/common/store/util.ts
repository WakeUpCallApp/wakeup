/**
 * This function coerces a string into a string literal type.
 * Using tagged union types in TypeScript 2.0, this enables
 * powerful typechecking of our reducers.
 *
 * Since every action label passes through this function it
 * is a good place to ensure all of our action labels
 * are unique.
 */

const typeCache: { [label: string]: boolean } = {};
export function type<T>(label: T | ''): T {
    if (typeCache[<string>label]) {
        throw new Error(`Action type "${label}" is not unique"`);
    }

    typeCache[<string>label] = true;

    return <T>label;
}


export function addEvent(object, eventType, callback) {
    if (object == null || typeof (object) === 'undefined') {
        return;
    }
    if (object.addEventListener) {
        object.addEventListener(eventType, callback, false);
    } else if (object.attachEvent) {
        object.attachEvent('on' + eventType, callback);
    } else {
        object['on' + eventType] = callback;
    }
}
