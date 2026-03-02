import fs from 'fs';
import { fileURLToPath } from 'url';

/**
 * The Grudge Oracle (Weapon of @Cynic)
 * Focus: Preventing repeated failures.
 * Scans the shame-log for similar past failures based on keywords.
 */
export function consultOracle(shameLogPath, keywords = []) {
    try {
        if (!fs.existsSync(shameLogPath)) {
            return { verdict: 'PASSED', rationale: "No Shame Log exists. A clean slate... for now." };
        }

        const content = fs.readFileSync(shameLogPath, 'utf-8');
        const logs = content.split('## ['); // Very naive log splitting
        const grudgesFound = [];

        logs.forEach(log => {
            for (const keyword of keywords) {
                // Find if this specific failure has happened before regarding these keywords
                if (log.toLowerCase().includes(keyword.toLowerCase())) {
                    grudgesFound.push({ keyword, logSnippet: log.substring(0, 150) + "..." });
                }
            }
        });

        return {
            tool: "The Grudge Oracle",
            target: shameLogPath,
            verdict: grudgesFound.length > 0 ? 'WARNING' : 'PASSED',
            rationale: grudgesFound.length > 0
                ? `[Historical Friction] I remember we failed at this before. ${grudgesFound.length} matches found.`
                : `No past grudges found for these terms. Don't create new ones.`,
            evidence: grudgesFound
        };
    } catch (err) {
        return { verdict: 'ERROR', rationale: err.message };
    }
}

const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
    const path = process.argv[2];
    const keywords = process.argv.slice(3);
    if (!path || keywords.length === 0) { console.error("Usage: node grudge-oracle.mjs <shame_log_path> <keyword1> ..."); process.exit(1); }
    console.log(JSON.stringify(consultOracle(path, keywords), null, 2));
}
