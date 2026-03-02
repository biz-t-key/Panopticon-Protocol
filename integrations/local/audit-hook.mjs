import fs from 'fs';
import path from 'path';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
    console.error("ERROR: GEMINI_API_KEY environment variable is required.");
    process.exit(1);
}

// Read switches from the target project where the hook is fired
const targetDir = process.cwd();
let panopticonConfig = { ruthless: "advisor", purge: "suggestion", chronicle: "silence" };
try {
    const rcPath = path.join(targetDir, '.panopticonrc');
    if (fs.existsSync(rcPath)) {
        panopticonConfig = { ...panopticonConfig, ...JSON.parse(fs.readFileSync(rcPath, 'utf-8')) };
    }
} catch (e) { }

const diffContent = fs.readFileSync(0, 'utf-8');

if (!diffContent || diffContent.trim() === '') {
    console.log(JSON.stringify({ verdict: "PASSED", rationale: "No changes detected by local hook." }));
    process.exit(0);
}

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
        const aiText = data.candidates[0].content.parts[0].text;
        const result = JSON.parse(aiText);

        console.log(`[BOARD VERDICT]: ${result.verdict}`);
        console.log(`[RATIONALE]: ${result.rationale}`);

        if (result.verdict !== "PASSED") {
            if (panopticonConfig.ruthless === "dictator") {
                console.error("❌ Physical push blockage active (Dictator mode).");
                process.exit(1);
            } else {
                console.warn("⚠️ Advisor mode active. Push allowed despite warnings.");
                process.exit(0);
            }
        }
    } catch (error) {
        console.error("AI Audit System Failure:", error.message);
        if (panopticonConfig.ruthless === "dictator") process.exit(1);
    }
}

runAudit();
