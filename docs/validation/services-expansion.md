# Services expansion — local preview

## Direction requested on 11 October 2026

Two scenes inside the existing “O que construímos” section, not separate service pages. The identity uses the actual SIDE logo in a construction grid, animated lines, palette and type. AI service uses the supplied frontal iPhone Air clay PSD body, with a live dark WhatsApp-inspired conversation and synchronized intent, team assignment and CRM state. All conversation content is fictional. User-provided personal screenshots were inspected only as interface references.

Local order: websites → visual identity → products → AI service/management → integrations. Roles identify chapters explicitly; integrations remains the final dark scene and the atmosphere transition now follows AI.

The five compositions share a 1.8s arrival. Opacity, blur and gradual layering are preserved. Dashboard layers/counters/drawing finish within that window; terminal typing and WhatsApp messages continue afterward as demonstrations. Identity grid, logo, palette and type also arrive within 1.8s; a short orbit/logo movement follows. New scene controls pause/resume or replay. Viewport/hidden-tab observers pause storytelling. Reduced motion immediately supplies a complete static composition and full transcript.

## Assets and implementation

- `public/media/services/iphone-air-clay.webp`: 15,130 bytes, 760×1573 transparent native device-body layer from the supplied PSD; live DOM screen aligned to source display bounds. No heavy PSD/ZIP in repository.
- Official SIDE SVG remains the central logo and chat avatar.
- Chat wallpaper is original SVG linework; no personal screenshot content shipped.
- New scene components, copy, CSS Modules and visible-scene motion hook stay in `src/features/services` using the existing GSAP stack; no app dependency added.
- `tsconfig.json` excludes the already Git/ESLint-ignored `artifacts` directory. The original typecheck failed on old JSX stored as `artifacts/cta-12/hero-integration.ts`; application types pass after aligning the exclusion.

## Verified evidence

- Before implementation, browser assertion expecting five chapters failed with actual count three.
- Reduced-motion review in PT desktop1440×1000, EN mobile390×844, PT mobile320×568: five chapters in correct order; no horizontal overflow or page errors; all five messages visible and final message contained by the phone chat area; completed operational state.
- Normal desktop motion: arrival sampled with 9.23px blur; first message appeared alone; user pause froze the conversation; leaving the viewport froze it; return resumed to completion. All three operational stages completed. Dark transition and reverse return to white passed.
- Final lint, typecheck/production TypeScript, production build (24 routes) and diff check passed.
- Home regression in PT1440×1000 and EN390×844: five scenes; dashboard completes and becomes interactive; period7 and seven-row data dialog work; Escape closes it; terminal reaches settled; closing CTA remains present; no horizontal overflow or page errors.
- Independent source review found no Critical/Important issues. Additional801×900 reduced and normal/replay browser checks passed. Main supporting copy/captions and secondary large headlines were darkened after the contrast review.
- Initial Home checks used fixed sleeps and observed some animations still playing during concurrent build/CPU work. Diagnostic samples confirmed progress and eventual completion with active/visible state. Final regression waits on actual settled state. The1.8s value is the shared GSAP timeline duration, not a frame-rate guarantee on busy hardware.

Browser evidence outside repository: `%TEMP%/side-services-qa/checks.json`, `motion.json`, `home.json`, screenshots. Chromium/Edge emulation, not physical iPhone/Safari verification.

## Review links

- Home: http://localhost:3000/#services
- Identity: http://localhost:3000/review/services/sequence#services-identity
- AI: http://localhost:3000/review/services/sequence#services-ai
- English sequence: http://localhost:3000/en/review/services/sequence

Visual changes remain local. Push/PR requires explicit visual approval under AGENTS.md.

## User refinement after first preview

Requested: remove replay buttons, gray grid background and frame; use horizontal/vertical background lines only; pointer effects on logo/palette; closer WhatsApp icons and structure; a product/service sales conversation; remove “Conversa demonstrativa” and “01 → 02 → 03”.

Implemented locally:

- New scene replay controls and their state/hook parameter removed. Pause/resume remains available for the conversation and finite identity movement.
- Identity grid is transparent, borderless and extended into the scene gutters; circles/orbit removed. Logo has damped pointer translation/rotation/scale on a separate inner layer. Palette tiles lift, tilt and show a passing highlight; type changes color/tracking on hover. Fine-pointer effects are disabled under reduced motion and touch.
- WhatsApp header has circular back/unread control, contact avatar, larger rounded call icons. Composer has individual circular plus/camera/microphone controls and a folded sticker icon; bubble tails and inline timestamps/double checks follow the supplied chat references. Customer bubbles are on the right and shop responses on the left.
- Fictional Luma Store sells Pulse wireless headphones: availability, black variant, sales-team handoff, pending payment and payment link as next action. No price or real checkout. Personal reference conversations/photos are not shipped.
- Messages enter the document flow only when they arrive. Chat scroll follows new messages and belongs to the same pausable timeline.
- Removed the demo label and numbered arrow rail. Mobile phone grows to320px where space permits.

Evidence: `%TEMP%/side-services-refinement/` (checks and screenshots). PT1440×1000, EN390×844 and PT320×568 reduced checks passed: no replay buttons/removed labels, transparent borderless grid without circles, complete sales conversation within chat bounds, no horizontal overflow/page errors. Normal desktop hover transforms, progressive message insertion and pause passed. Normal320 message-completion check also passed with the final message inside the chat. Lint, typecheck and diff check passed; production build result recorded once complete.

Final production build passed: compiled successfully, production TypeScript passed,24 routes generated. No push/PR or commit; updated scenes await visual review.

## Identity cleanup requested after refinement

Removed “S. / Visual system”, “x / y · 01”, “Side.” and “Forma. / Form.” from the identity composition. Removed the remaining pause/resume icon from both new scenes, together with its state, copy and CSS. The shared motion hook retains automatic pause outside the viewport and in hidden tabs. Identity lettering now becomes italic on hover; its letter spacing stays unchanged. Logo/palette interactions and gradual blur arrivals remain in place.

Current validation: lint, typecheck and diff check; Edge desktop1440×1000 with normal motion and English mobile390×844 with reduced motion. Browser evidence in `%TEMP%/side-services-cleanup/`: no removed texts or scene buttons, italic hover with unchanged tracking, all five conversation messages visible at completion, no horizontal overflow or page errors. Changes remain local for visual review.

## Final requested polish and publication

The user authorized branch creation, atomic commits and push after these refinements, specifying `vitoledors@gmail.com`, no coauthor and shutdown of the active local preview afterward. This explicit instruction supersedes the earlier local-only checkpoint.

Upright and italic letters now crossfade over1.6s with subtle interpolated slant and unchanged spacing, including the return transition. Reduced motion/touch keeps the upright state. The logo pointer uses separate scaleX/scaleY tweens to avoid GSAP's reset warning for the compound scale property.

WhatsApp wallpaper now has26 original rounded outline motifs in27 varied placements, with small accents and a repeat scaled to the phone width. It follows the supplied screenshot references; external reference is the [official WhatsApp chat-theme announcement](https://blog.whatsapp.com/chat-themes-to-reflect-your-style). No personal screenshot or downloaded wallpaper is included.

Final browser evidence: `%TEMP%/side-services-final/checks.json` and screenshots. Desktop1440×1000 normal, EN390×844 reduced and PT320×568 reduced cover hover progression/return, five chapters, absent controls/texts, completed five-message conversation, wallpaper loading, overflow and runtime checks.

All final scenarios passed with no horizontal overflow or page errors. The italic layer progressed from0 to0.237 at the early sample,0.871 at the middle sample and1 at completion; spacing stayed-6.825px. Return to upright completed smoothly. Wallpaper SVG loaded successfully with27 placements. Lint and final production build passed, including production TypeScript and24 generated routes; diff check passed. Publication branch: `feat/services-identity-whatsapp-ai`, authorized authorship `vitoledors@gmail.com` without coauthor.
