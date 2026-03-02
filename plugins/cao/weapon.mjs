import fs from 'fs';
import { fileURLToPath } from 'url';

/**
 * The Caliper (Weapon of @CAO)
 * Focus: Enforcing The Rule of Atomicity.
 * Measures purely physical constraints of the file (lines, depth).
 */
export function runCaliper(filePath, maxLines = 150) {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const lines = content.split('\n').length;

        // Very naive cyclomatic complexity guess (counting indents)
        // A true caliper would use tree-sitter or eslint logic here.
        const maxIndent = Math.max(...content.split('\n').map(l => (l.match(/^\s+/) || [''])[0].length));

        return {
            tool: "The Caliper",
            target: filePath,
            metrics: {
                totalLines: lines,
                maxIndentSpaces: maxIndent
            },
            verdict: lines > maxLines ? 'VETO' : 'PASSED',
            rationale: lines > maxLines
                ? `[Rule of Atomicity] File exceeds hard limit of ${maxLines} lines.`
                : `Physical dimensions within acceptable limits.`
        };
    } catch (err) {
        return { verdict: 'ERROR', rationale: err.message };
    }
}

const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
    const path = process.argv[2];
    if (!path) { console.error("Usage: node caliper.mjs <file_path>"); process.exit(1); }
    console.log(JSON.stringify(runCaliper(path), null, 2));
}
