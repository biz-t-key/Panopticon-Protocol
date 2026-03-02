import fs from 'fs';
import path from 'path';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
    console.error("ERROR: GEMINI_API_KEY environment variable is required.");
    process.exit(1);
}

// ----------------------------------------------------
// THE CONTROL DIAL: Reading Governance Switches
// ----------------------------------------------------
let panopticonConfig = { ruthless: "advisor", purge: "suggestion", chronicle: "silence" };
try {
    const rcPath = path.join(process.cwd(), '.panopticonrc');
    if (fs.existsSync(rcPath)) {
        panopticonConfig = { ...panopticonConfig, ...JSON.parse(fs.readFileSync(rcPath, 'utf-8')) };
    }
} catch (e) {
    console.error("Failed to read .panopticonrc, defaulting to advisor mode.", e.message);
}

const diffContent = fs.readFileSync(0, 'utf-8'); // Read diff from stdin

if (!diffContent || diffContent.trim() === '') {
    console.log(JSON.stringify({ verdict: "PASSED", rationale: "No changes detected." }));
    process.exit(0);
}

// Future state: This would dynamically load /plugins/*/manifest.json and aggregate rules.
// For now, it acts as the centralized Supreme Trio.
const systemPrompt = `
You are the Supreme Executive Board of the Panopticon-OS.
Your job is to ruthlessly audit the provided git diff against the core project laws.

Analyze the diff. If the code implies ANY violation of software patterns, architectural purity (Max 150 lines), or hardcoded secrets, you MUST issue a VETO.
Otherwise, issue PASSED.

Your response MUST be valid JSON in this exact format:
{
  "verdict": "PASSED" | "VETO",
  "rationale": "Short explanation of the decision, citing the specific law if VETOed. Must be safe for public release."
}
`;

async function runAudit() {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                systemInstruction: { parts: [{ text: systemPrompt }] },
                contents: [{ role: "user", parts: [{ text: `Here is the code diff to audit:\n\n${diffContent}` }] }],
                generationConfig: {
                    temperature: 0.1,
                    responseMimeType: "application/json"
                }
            })
        });

        const data = await response.json();
        if (data.error) throw new Error(data.error.message);

        const aiText = data.candidates[0].content.parts[0].text;
        const result = JSON.parse(aiText);

        // Output JSON for the bash script to catch
        console.log(JSON.stringify(result));

        if (result.verdict !== "PASSED") {
            // [RUTHLESS SWITCH LOGIC]
            if (panopticonConfig.ruthless === "dictator") {
                // Physical restraint: Block the merge.
                process.exit(1);
            } else {
                // Advisor mode: The AI screamed, but we let the human proceed.
                process.exit(0);
            }
        }
    } catch (error) {
        console.error("AI Audit System Failure:", error.message);
        console.log(JSON.stringify({ verdict: "VETO", rationale: "AI Board Offline. Defaulting to lockdown." }));
        if (panopticonConfig.ruthless === "dictator") process.exit(1);
    }
}

runAudit();
