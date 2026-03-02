// test-lodash.ts
import { get, isEmpty } from './lodash-pure.ts';

console.log("👁️ Running Lodash Pure Inquisition Test...");

const obj = { 'a': [{ 'b': { 'c': 3 } }] };

// Test get
const g1 = get(obj, 'a[0].b.c');
const g2 = get(obj, ['a', '0', 'b', 'c']);
const g3 = get(obj, 'a.b.c', 'default');

console.log(`[${g1 === 3 ? 'PASS' : 'FAIL'}] get(obj, 'a[0].b.c') => ${g1}`);
console.log(`[${g2 === 3 ? 'PASS' : 'FAIL'}] get(obj, ['a', '0', 'b', 'c']) => ${g2}`);
console.log(`[${g3 === 'default' ? 'PASS' : 'FAIL'}] get(obj, 'a.b.c', 'default') => ${g3}`);

// Test isEmpty
const e1 = isEmpty(null);
const e2 = isEmpty([]);
const e3 = isEmpty({});
const e4 = isEmpty([1, 2, 3]);
const e5 = isEmpty({ a: 1 });
const e6 = isEmpty(new Map());
const e7 = isEmpty(new Set([1]));

console.log(`[${e1 === true ? 'PASS' : 'FAIL'}] isEmpty(null)`);
console.log(`[${e2 === true ? 'PASS' : 'FAIL'}] isEmpty([])`);
console.log(`[${e3 === true ? 'PASS' : 'FAIL'}] isEmpty({})`);
console.log(`[${e4 === false ? 'PASS' : 'FAIL'}] isEmpty([1,2,3])`);
console.log(`[${e5 === false ? 'PASS' : 'FAIL'}] isEmpty({a:1})`);
console.log(`[${e6 === true ? 'PASS' : 'FAIL'}] isEmpty(new Map())`);
console.log(`[${e7 === false ? 'PASS' : 'FAIL'}] isEmpty(new Set([1]))`);

const allPass = [g1 === 3, g2 === 3, g3 === 'default', e1, e2, e3, !e4, !e5, e6, !e7].every(Boolean);

if (allPass) {
    console.log("\n✅ Lodash Pure Sweep: SUCCESS. The soul is pure.");
} else {
    console.log("\n❌ Lodash Pure Sweep: FAILURE. Impurities detected.");
}
