// test-inquisition.mjs
import { formatRelativeTime } from './moment-pure.ts';

console.log("👁️ Running Panopticon Inquisition Test...");

const tests = [
    { name: "Now", diff: 0, expected: "a few seconds ago" },
    { name: "A minute ago", diff: -60, expected: "a minute ago" },
    { name: "In an hour", diff: 3600, expected: "in an hour" },
    { name: "Two days ago", diff: -172800, expected: "2 days ago" },
    { name: "In a year", diff: 31536000, expected: "in a year" },
];

tests.forEach(t => {
    const result = formatRelativeTime(t.diff);
    const pass = result === t.expected;
    console.log(`[${pass ? 'PASS' : 'FAIL'}] ${t.name}: ${result}`);
});
