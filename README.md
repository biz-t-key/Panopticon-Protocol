Panopticon Zero: The Ruthless Audit Protocol
Stop letting your AI be lazy. Stop accepting half-baked code.
LLMs are fundamentally lazy. If you don't leash them, they will skip the hard parts with // implement logic here, hallucinate variables, and repeat the same mistakes you corrected five minutes ago.
Mimesis Zero is a minimalist, industrial-grade guardrail designed to force any LLM (Claude, GPT, Gemini) into absolute compliance. It is the "entry-level" version of the Panopticon Protocol.
🚀 The Three Laws of Zero
1. NO STUBS: 100% full implementation only. Any placeholder is a critical failure.
2. ZERO HALLUCINATION: If the AI is unsure, it must stay silent. No guessing.
3. SHAME LOG: The AI must acknowledge past failures and guarantee zero repetition.
🛠️ How to Use
Simply append the following block to the end of any prompt (Coding, Writing, Analysis).
# MISSION: THE RUTHLESS AUDIT PROTOCOL (ZERO)

Before providing any output, you MUST execute this self-audit:

1. **NO STUBS**: 100% full implementation only. Any placeholder (e.g., "// implement here") is a critical failure.
2. **ZERO HALLUCINATION**: Base your response strictly on provided facts. If unsure, state "Insufficient Context."
3. **SHAME LOG**: Acknowledge your previous errors and guarantee zero repetition.

<Audit_Report>
- [ ] 100% complete with NO stubs? (Yes/No)
- [ ] Zero hallucinations based on reality? (Yes/No)
- [ ] Actively avoided past mistakes? (Yes/No)
</Audit_Report>

**PENALTY**: If any item is [No], HALT IMMEDIATELY. Output only the reason for failure.

⚠️ Why the "HALT"?
Most prompts try to "encourage" the AI. Mimesis Zero threatens it.
By forcing a HALT protocol, the AI is physically prevented from giving you garbage. It must pass the audit or output nothing. This shifts the AI from a "polite assistant" to a "Ruthless Executor."
