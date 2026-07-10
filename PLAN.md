Updated todo list

## Plan: GreenLens Branded Website

Build a polished, single-page landing site for GreenLens that feels like a real product launch page. The strongest structure here is one page: it matches the linear user story, keeps the build simple with vanilla HTML, CSS, and JS, and lets the bot demo, trust signals, and Telegram CTA all live in one flow.

**Steps**

1. Lock the page narrative and section order first: Hero, How It Works, Demo, Why It Matters, CTA, and a concise footer. The story should move from problem to solution to proof to action without detours.
2. Define the brand system before layout work: name treatment, palette, typography direction, spacing rhythm, and button style. This keeps the page visually coherent from the start.
3. Build the semantic HTML skeleton in index.html with anchors, section containers, and placeholders for the demo media and stats. This should include the Telegram link and a footer disclaimer about deferring to official guidance when unsure.
4. Style the full experience in style.css, starting with responsive layout and section spacing, then the hero composition, step cards, stats callouts, demo framing, and CTA treatment. Finish with mobile refinements and subtle motion or hover states.
5. Add only lightweight interaction in app.js if it improves usability, such as smooth scrolling, nav highlighting, or optional demo fallback behavior. Avoid any scripting that changes the simple landing-page character.
6. Finalize content, assets, and verification last: insert the provided logo, demo screenshot, NEA figures, and Telegram CTA; then check desktop and mobile readability, contrast, and whether the tone feels like a real consumer product.

**Relevant files**

- index.html — semantic page structure, navigation anchors, hero copy, how-it-works steps, demo section, Why It Matters stats, CTA, and footer disclaimer.
- style.css — branding system, responsive layout, typography, color palette, cards, section spacing, CTA styling, and mobile behavior.
- app.js — optional minimal polish only; keep behavior light and non-essential.

**Section content**

- Hero / intro: use the tagline Recycle right, not just recycle. as the main hero line, with a short supporting sentence explaining that GreenLens is a Telegram bot that reads item photos and returns NEA-grounded disposal guidance.
- How It Works: show a 3-step visual of photo in, AI identifies the material, GreenLens returns exact disposal instructions and prep notes.
- Demo: feature the pasted Telegram screenshot prominently, with a caption that explains the bot response format and a secondary note that the bot only answers when grounded in official guidance.
- Why It Matters: cite NEA-backed figures directly from nea.gov.sg, including the 11 percent domestic recycling rate, the estimated 40 percent contamination in household recycling bins, and the 70 percent overall recycling target by 2030.
- CTA: point to t.me/GreenLensBot with a clear Try it on Telegram action and a reassurance line that users get fast, low-effort, no-guess disposal guidance.
- Footer: include a short trust disclaimer, a source note referencing NEA, and a small project attribution if needed.

**Brand direction**

- Name treatment: present GreenLens as a clean, modern wordmark with emphasis on clarity and precision rather than playful recycling iconography.
- Tone: friendly, confident, and reassuring; avoid sounding preachy or overly technical.
- Visual mood: credible and contemporary, with subtle eco cues instead of leaf-heavy clichés.
- Logo usage: use the supplied logo as a supporting brand mark, ideally with enough breathing room so the wordmark remains legible on both desktop and mobile.

**Colour palette**

- Deep forest: #10251E
- Evergreen: #2E6B4F
- Fresh green: #6DAF6C
- Mist sage: #DDE9DE
- Warm paper: #F6F4ED
- Ink charcoal: #1E2422
- Accent gold: #D5A84A

**Build order**

1. Write the content skeleton and section hierarchy.
2. Establish the visual system and overall brand treatment.
3. Implement the hero and CTA first because they drive the page’s first impression and conversion.
4. Add the How It Works section and demo framing next so the product proof is visible early.
5. Build the Why It Matters section with the supplied NEA figures and citation wording.
6. Finish with footer, responsive tuning, and small interaction polish.

**Assets needed from you**

- The Telegram bot link is already supplied: t.me/GreenLensBot.
- The pasted demo screenshot is already supplied and should be used for the demo section.
- The logo in the pasted image should be used as the brand mark; a transparent or higher-resolution version would still be helpful if available.
- The NEA source links you supplied are already sufficient for the Why It Matters section.
- No additional assets are strictly required before implementation begins.

**Verification**

1. Check the page at desktop and mobile widths for hierarchy, spacing, and readability.
2. Confirm the CTA points to t.me/GreenLensBot and the demo media renders cleanly.
3. Verify the Why It Matters section uses the supplied NEA figures and that the source attribution is visible.
4. Review the final copy to make sure it reads like a real product landing page rather than a school assignment.
