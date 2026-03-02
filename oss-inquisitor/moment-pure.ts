/**
 * @name Moment Pure: Relative Time
 * @version 1.0.0
 * @license MIT (Derived from Moment.js)
 * @author Original: Tim Wood, Iskren Chernev, Moment.js contributors
 * @refiner Panopticon-OS
 * 
 * THE SOUL:
 * This module contains the core relative time calculation logic extracted from Moment.js.
 * All legacy polyfills, global pollution, and non-essential locales have been removed.
 * We preserve the "Soul" of the algorithm while liberating it from 10 years of technical debt.
 */

export interface RelativeTimeThresholds {
    ss: number; // seconds to seconds
    s: number;  // seconds to minute
    m: number;  // minutes to minute
    mm: number; // minutes to minutes
    h: number;  // hours to hour
    hh: number; // hours to hours
    d: number;  // days to day
    dd: number; // days to days
    M: number;  // months to month
    MM: number; // months to months
    y: number;  // years to year
    w?: number; // weeks (optional)
}

export const defaultThresholds: RelativeTimeThresholds = {
    ss: 44,
    s: 45,
    m: 45,
    h: 22,
    d: 26,
    M: 11,
    y: 1, // Placeholder for year logic
};

export const defaultStrings = {
    future: 'in %s',
    past: '%s ago',
    s: 'a few seconds',
    ss: '%d seconds',
    m: 'a minute',
    mm: '%d minutes',
    h: 'an hour',
    hh: '%d hours',
    d: 'a day',
    dd: '%d days',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years',
};

/**
 * The core formatter. Injected by Panopticon to replace global locale data.
 */
function substituteTimeSpan(number: number, withoutSuffix: boolean, key: string, isFuture: boolean): string {
    const string = (defaultStrings as any)[key];
    return typeof string === 'function'
        ? string(number, withoutSuffix, key, isFuture)
        : string.replace(/%d/i, number);
}

/**
 * The Heart: Logic that determines the appropriate time unit.
 * Liberated from the monolithic Duration prototype.
 */
export function formatRelativeTime(
    differenceInSeconds: number,
    withoutSuffix: boolean = false,
    thresholds: RelativeTimeThresholds = defaultThresholds
): string {
    const absSeconds = Math.abs(differenceInSeconds);
    const absMinutes = Math.round(absSeconds / 60);
    const absHours = Math.round(absMinutes / 60);
    const absDays = Math.round(absHours / 24);
    const absMonths = Math.round(absDays / 30);
    const absYears = Math.round(absDays / 365);

    const isFuture = differenceInSeconds > 0;

    let a: [string, number?] =
        (absSeconds <= thresholds.ss && ['s', absSeconds]) ||
        (absSeconds < thresholds.s && ['ss', absSeconds]) ||
        (absMinutes <= 1 && ['m']) ||
        (absMinutes < thresholds.m && ['mm', absMinutes]) ||
        (absHours <= 1 && ['h']) ||
        (absHours < thresholds.h && ['hh', absHours]) ||
        (absDays <= 1 && ['d']) ||
        (absDays < thresholds.d && ['dd', absDays]) ||
        (absMonths <= 1 && ['M']) ||
        (absMonths < thresholds.M && ['MM', absMonths]) ||
        (absYears <= 1 && ['y']) || ['yy', absYears];

    const output = substituteTimeSpan(a[1] || 1, withoutSuffix, a[0], isFuture);

    if (withoutSuffix) {
        return output;
    }

    const format = isFuture ? defaultStrings.future : defaultStrings.past;
    return format.replace(/%s/i, output);
}
