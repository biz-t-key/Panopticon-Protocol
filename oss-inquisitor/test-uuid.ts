// test-uuid.ts
import { uuidv4 } from './uuid-pure.ts';

console.log("👁️ Running UUID v4 Inquisition Test...");

const uuid = uuidv4();
console.log(`Generated: ${uuid}`);

// Regex for v4 UUID
const v4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const isFormatValid = v4Regex.test(uuid);
const version = uuid.charAt(14);
const variant = uuid.charAt(19);

console.log(`[${isFormatValid ? 'PASS' : 'FAIL'}] Format (RFC 4122)`);
console.log(`[${version === '4' ? 'PASS' : 'FAIL'}] Version: ${version}`);
console.log(`[${['8', '9', 'a', 'b'].includes(variant.toLowerCase()) ? 'PASS' : 'FAIL'}] Variant: ${variant}`);

if (isFormatValid && version === '4') {
    console.log("\n✅ UUID v4 Purge: SUCCESS. The soul is pure.");
} else {
    console.log("\n❌ UUID v4 Purge: FAILURE. Impurities detected.");
}
