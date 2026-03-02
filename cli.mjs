#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = process.cwd();
const command = process.argv[2];

if (command === 'init') {
    console.log("👁️ Initializing Panopticon-OS in local territory...");

    // 1. Inject .panopticonrc
    const rcPath = path.join(targetDir, '.panopticonrc');
    if (!fs.existsSync(rcPath)) {
        fs.writeFileSync(rcPath, JSON.stringify({ ruthless: "advisor", purge: "suggestion", chronicle: "silence" }, null, 2));
        console.log("✅ Installed The Control Dial (.panopticonrc)");
    } else {
        console.log("⚠️ .panopticonrc already exists.");
    }

    // 2. Inject Git Pre-Push Hook (The true secret gate)
    const gitDir = path.join(targetDir, '.git');
    if (fs.existsSync(gitDir)) {
        const hooksDir = path.join(gitDir, 'hooks');
        if (!fs.existsSync(hooksDir)) fs.mkdirSync(hooksDir, { recursive: true });

        const prePushPath = path.join(hooksDir, 'pre-push');
        // We point directly to the actual audit script inside the global OS folder!
        const auditScriptPath = path.join(__dirname, 'integrations', 'local', 'audit-hook.mjs').replace(/\\/g, '/');

        const hookContent = `#!/bin/sh
# Panopticon-OS Pre-Push Gate
echo "👁️ Panopticon is auditing your push..."

# Grab the unpushed commits against main (or just the latest commit for simplicity)
git diff origin/main...HEAD | node "${auditScriptPath}"

if [ $? -ne 0 ]; then
  echo "❌ Push VETOED by Panopticon-OS."
  exit 1
fi
echo "✅ Push Approved by the Board."
exit 0
`;
        // Write hook and make executable
        fs.writeFileSync(prePushPath, hookContent);
        fs.chmodSync(prePushPath, '755');
        console.log("✅ Injected physical restraint (Git pre-push hook).");
    } else {
        console.log("⚠️ Not a Git repository. Cannot inject physical restraint.");
    }

    console.log("\\n🎉 Panopticon-OS successfully wired. Your secret is safe.");
    console.log("Remember to set GEMINI_API_KEY in your local environment variables.");

} else {
    console.log("Usage: panopticon init");
}
