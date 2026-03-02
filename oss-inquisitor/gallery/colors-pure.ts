/**
 * @name Colors Pure: Terminal Aesthetics
 * @version 1.0.0
 * @license MIT
 * @author Panopticon-OS
 * 
 * THE SOUL:
 * This module replaces 'chalk' and 'colors' with native ANSI escape codes.
 * It eliminates the ESM/CJS compatibility issues and provides atomic
 * functions for the most-used terminal aesthetics.
 */

const esc = (code: number) => `\x1b[${code}m`;
const reset = esc(0);

export const colors = {
    reset: 0,
    bold: 1,
    dim: 2,
    italic: 3,
    underline: 4,

    // Foreground
    black: 30,
    red: 31,
    green: 32,
    yellow: 33,
    blue: 34,
    magenta: 35,
    cyan: 36,
    white: 37,
    gray: 90,

    // Bright Foreground
    brightRed: 91,
    brightGreen: 92,
    brightYellow: 93,
    brightBlue: 94,
    brightMagenta: 95,
    brightCyan: 96,
    brightWhite: 97,
};

/**
 * Wraps text in ANSI escape codes.
 * @example color('Hello', colors.green)
 */
export function color(text: string, colorCode: number): string {
    return `${esc(colorCode)}${text}${reset}`;
}

// Shorthands
export const red = (text: string) => color(text, colors.red);
export const green = (text: string) => color(text, colors.green);
export const yellow = (text: string) => color(text, colors.yellow);
export const blue = (text: string) => color(text, colors.blue);
export const cyan = (text: string) => color(text, colors.cyan);
export const bold = (text: string) => color(text, colors.bold);
export const dim = (text: string) => color(text, colors.dim);
