import fs from 'fs';
import { fileURLToPath } from 'url';

/**
 * The Guillotine (Weapon of @CLO)
 * Focus: Immediate execution of illegal code.
 * Scans for forbidden terms, unsafe imports, and raw types.
 */
export function runGuillotine(filePath, forbiddenTerms = ['any', 'unknown', '// TODO', 'console.log', 'debugger']) {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const lines = content.split('\n');
        const violations = [];

        lines.forEach((line, index) => {
            // Ignore normal legal comments
            for (const term of forbiddenTerms) {
                if (line.includes(term) && !line.includes('eslint-disable')) {
                    violations.push({ line: index + 1, violation: `Contains forbidden string: '${term}'` });
                }
            }
        });

        return {
            tool: "The Guillotine",
            target: filePath,
            verdict: violations.length > 0 ? 'VETO' : 'PASSED',
            rationale: violations.length > 0
                ? `[Compliance Failure] Found ${violations.length} illegal constructs. Refactor immediately.`
                : `No static violations detected.`,
            evidence: violations
        };
    } catch (err) {
        return { verdict: 'ERROR', rationale: err.message };
    }
}

const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
    const path = process.argv[2];
    if (!path) { console.error("Usage: node guillotine.mjs <file_path>"); process.exit(1); }
    console.log(JSON.stringify(runGuillotine(path), null, 2));
}
