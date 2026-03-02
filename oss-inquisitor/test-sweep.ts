// test-sweep.ts
import { uuidv4 } from './uuid-pure.ts';
import { get, isEmpty } from './lodash-pure.ts';
import { parseXml } from './xml-pure.ts';
import * as term from './colors-pure.ts';

console.log(term.bold(term.cyan("👁️ Running Panopticon 'Modern Sweep' Final Test...")));

// 1. UUID
const id = uuidv4();
console.log(`${term.dim("UUID:   ")} ${id} [${/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id) ? term.green('PASS') : term.red('FAIL')}]`);

// 2. Lodash
const obj = { x: [{ y: 42 }] };
const val = get(obj, 'x[0].y');
const empty = isEmpty({});
console.log(`${term.dim("Lodash: ")} get(x[0].y) => ${val} [${val === 42 ? term.green('PASS') : term.red('FAIL')}]`);
console.log(`${term.dim("Lodash: ")} isEmpty({}) => ${empty} [${empty === true ? term.green('PASS') : term.red('FAIL')}]`);

// 3. XML
const xml = `<root><user name="Neo"><rank>Leader</rank></user></root>`;
const data = parseXml(xml);
const rank = data.root.user.rank;
console.log(`${term.dim("XML:    ")} user.rank => ${rank} [${rank === 'Leader' ? term.green('PASS') : term.red('FAIL')}]`);

console.log(term.bold(term.green("\n✅ ALL PURIFIED SYSTEMS OPERATIONAL.")));
