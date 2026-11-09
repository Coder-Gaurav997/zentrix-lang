# ZENTRIX site redesign

## What will change
- Replace the current glow-heavy presentation with a polished, restrained developer-tool aesthetic, clearer page hierarchy, and a responsive layout.
- Rework the introduction, live playground, language guide, About dialog, and footer while preserving Gaurav Pandey, the GitHub profile/repository links, and language details.
- Improve the playground with practical editing controls and a clearer run/output experience.
- Extend the browser interpreter with string-aware `+` and unary `!`, using existing operators and keeping Zentrix's current source syntax; add tests for both behaviors.

## Technical details
- Keep the site in its existing React sections and keep code execution in the browser.
- Use semantic theme tokens and the existing button component for interactive controls.
- Update project guidance to record the section-based UI and client-side interpreter decisions.
