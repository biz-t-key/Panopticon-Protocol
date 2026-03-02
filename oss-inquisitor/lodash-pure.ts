/**
 * @name Lodash Pure: Essential Utilities
 * @version 1.0.0
 * @license MIT (Derived from Lodash)
 * @author Original: Jeremy Ashkenas, John-David Dalton
 * @refiner Panopticon-OS
 * 
 * THE SOUL:
 * This module extracts only the most-voted functions from Lodash (get, isEmpty)
 * and implements them using modern JS patterns, stripping away 500KB of 
 * legacy environment support.
 */

/**
 * Gets the value at `path` of `object`.
 * Supports both dot notation ("a.b.c") and bracket notation ("a[0].b").
 */
export function get(object: any, path: string | string[], defaultValue?: any): any {
    const pathArray = Array.isArray(path)
        ? path
        : path.split(/[.[\]]/g).filter(Boolean);

    const result = pathArray.reduce((prev, curr) => prev?.[curr], object);
    return result === undefined ? defaultValue : result;
}

/**
 * Checks if `value` is an empty object, collection, map, or set.
 * Objects are considered empty if they have no own enumerable string keyed properties.
 */
export function isEmpty(value: any): boolean {
    if (value == null) return true;

    // Primitives other than string are "empty" by Lodash definition (except boolean/number)
    if (typeof value === 'boolean' || typeof value === 'number') return true;

    if (typeof value === 'string' || Array.isArray(value)) {
        return value.length === 0;
    }

    if (value instanceof Map || value instanceof Set) {
        return value.size === 0;
    }

    if (typeof value === 'object') {
        // Check if it's a plain object or prototype
        return Object.keys(value).length === 0;
    }

    return true;
}
