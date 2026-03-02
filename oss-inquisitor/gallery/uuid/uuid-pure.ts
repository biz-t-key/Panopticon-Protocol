/**
 * @name UUID Pure: Version 4
 * @version 1.0.0
 * @license MIT (Derived from uuid)
 * @author Original: Robert Kieffer and uuid contributors
 * @refiner Panopticon-OS
 * 
 * THE SOUL:
 * This module contains the core UUID v4 generation logic.
 * It removes the need for large multi-version packages, pre-allocation pools,
 * and complex environment detection.
 */

const byteToHex: string[] = [];

for (let i = 0; i < 256; ++i) {
    byteToHex.push((i + 0x100).toString(16).slice(1));
}

/**
 * Convert array of 16 byte values to UUID string format.
 * Optimized bitwise-free hex conversion.
 */
function stringify(arr: Uint8Array): string {
    return (
        byteToHex[arr[0]] +
        byteToHex[arr[1]] +
        byteToHex[arr[2]] +
        byteToHex[arr[3]] +
        '-' +
        byteToHex[arr[4]] +
        byteToHex[arr[5]] +
        '-' +
        byteToHex[arr[6]] +
        byteToHex[arr[7]] +
        '-' +
        byteToHex[arr[8]] +
        byteToHex[arr[9]] +
        '-' +
        byteToHex[arr[10]] +
        byteToHex[arr[11]] +
        byteToHex[arr[12]] +
        byteToHex[arr[13]] +
        byteToHex[arr[14]] +
        byteToHex[arr[15]]
    );
}

/**
 * Generate a RFC4122 v4 UUID.
 * 100% Client-side compatible (Web Crypto API).
 */
export function uuidv4(): string {
    const rnds = new Uint8Array(16);

    // Use Web Crypto API (supported in all modern browsers and Node 15+)
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
        crypto.getRandomValues(rnds);
    } else {
        // Fallback for very old Node environments if necessary, 
        // but Panopticon targets modern environments.
        throw new Error('Crypto API not available');
    }

    // Per RFC 4122 Section 4.4:
    // Set bits for version 4 (0100)
    rnds[6] = (rnds[6] & 0x0f) | 0x40;
    // Set bits for variant 1 (10xx)
    rnds[8] = (rnds[8] & 0x3f) | 0x80;

    return stringify(rnds);
}
