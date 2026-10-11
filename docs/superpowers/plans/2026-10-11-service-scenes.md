# Service scenes implementation plan

> **For agentic workers:** Implement locally task by task. The user's requested composition and arrival correction authorize this local work. Publishing requires explicit visual approval under AGENTS.md.

**Goal:** Expand “O que construímos” with SIDE visual identity and WhatsApp AI/team/CRM scenes, preserving gradual blur arrivals with one shared rhythm.

**Architecture:** Two focused client demos use the existing GSAP/ScrollTrigger stack. Services identifies chapters by role rather than array position. A shared visible-scene timeline helper pauses new demos offscreen and in hidden tabs.

**Tech Stack:** Next 16.3.8, React 19.3.0, GSAP 3.15, CSS Modules, official SIDE SVG, optimized provided PSD asset.

**Spec:** User's 11 October refinement; `docs/references/services/expansion-study.md` provides source research, superseded where it suggests a fictional identity or a standalone chat panel.

## Global constraints

- Local changes and functional preview only; no push/PR before visual approval.
- Native PT-BR/EN copy; no actual personal messages or contact photos from supplied references.
- Arrival takes 1.8 seconds across five demos. Preserve opacity, blur and gradual sequencing. Internal storytelling starts after arrival and may take longer.
- Identity: official SIDE logo centered in animated construction grid, palette, typography.
- AI: front-facing supplied clay iPhone mockup, dark WhatsApp-style interface, sequential messages, synchronized intent/team/CRM, fictional local data.
- Respect reduced motion, hidden tabs and offscreen pauses. No visible animation controls in the two new scenes, per the user's final refinement.

## Review focus

- Inserting chapters must preserve the light-to-dark transition immediately before integrations, including reverse scroll.
- Mobile 320/390px and short desktop must remain legible without horizontal overflow.
- Leaving a scene must freeze its storytelling, with no replay on a simple return.
- Reduced motion must show all messages and completed management state immediately.
- Existing dashboard period/table and terminal replay must remain usable.

## Tasks

1. Inspect ZIP entries and source mockup layers; export only the device presentation needed for a live DOM screen. Keep large source PSDs and private screenshots outside repository.
2. Record browser assertions before implementation: five scenes in both locales; new narrative appears; reduced state is complete; management stays synchronized; no overflow. Observe failure against the current three-scene LP.
3. Add `serviceScenesCopy.ts`, `useServiceSceneMotion.ts`, `BrandIdentityDemo.tsx`/`brand-identity.module.css`, `WhatsAppAiDemo.tsx`/`whatsapp-ai.module.css`. Shared entrance and once-only internal timelines with automatic pauses; accessible fixed transcript.
4. Integrate explicit service roles in `Services.tsx`. Move atmosphere to the end of AI. Replace numeric dark selector in `services.module.css`. Add lightweight scene review entry points through existing review pattern.
5. Normalize existing entrance durations in `useDigitalExperienceMotion.ts`, `useDashboardMotion.ts`, `useTerminalMotion.ts`, using `serviceEntrance.ts` as shared contract. Complete dashboard visual layers by 1.8s; start terminal typing after its shell arrives.
6. Run browser assertions, inspect screenshots desktop/mobile/PT/EN/reduced and mid-arrival. Run lint, typecheck, build and diff check. Present preview and leave changes local for visual review.

## Execution record

- Source exploration and primary-source reference study completed before this plan.
- Local native implementation chosen to finish the requested reviewable preview without a further permission round; no external side effects.
- Commit responsibilities, when requested: identity scene, AI scene, chapter integration, shared motion timing, evidence/docs. No monolithic issue commit.

## Final refinement and publication authorization

On11October the user requested a slower italic hover and a more faithful WhatsApp doodle wallpaper, explicitly authorized branch creation and atomic commits/push as `vitoledors@gmail.com` with no coauthor, and requested stopping the active local web service afterward.

- Replace abrupt font-style switching with a1.6s crossfade between upright and actual italic lettering, with slight interpolated slant and unchanged tracking. No new font dependency.
- Author detailed rounded outline motifs from the supplied interface references; research the official WhatsApp theme source. Keep wallpaper lightweight SVG and scale its repeat relative to the phone.
- Validate normal hover progression/return, desktop/mobile PT/EN/reduced, conversation completion and existing five-scene flow; run lint, production build/TypeScript and diff check.
- Create `feat/services-identity-whatsapp-ai`. Commit by responsibility: build exclusion; shared copy/motion; identity scene; WhatsApp scene/assets; chapter integration; arrival timing; reference study; implementation/validation notes. Verify email and absence of coauthor in every new commit, then push the branch.
- Stop the active local Side preview after verification and publication; verify its listening port is closed.
