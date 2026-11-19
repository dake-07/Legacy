# Legacy Hub design system

**Direction:** Proof on the ground
**Audience:** Diaspora clients, retirees, and investors making property and relocation decisions in Ghana
**Primary job:** Make remote decisions feel visible, verifiable, and well coordinated

## Core palette

| Token | Value | Use |
|---|---:|---|
| Ghana forest | `#0B554E` | Primary actions, active states, verification |
| Deep canopy | `#073A36` | Dark editorial surfaces and footer |
| Survey gold | `#C7A85A` | Recorded evidence and important milestones only |
| Coastal white | `#F7FAF8` | Main page background |
| Concrete | `#DDE5E1` | Quiet surfaces and dividers |
| Ink | `#111815` | Primary text |

## Typography

- **Interface and body:** Plus Jakarta Sans
- **Editorial statements:** Playfair Display, used sparingly
- Body copy stays below 80 characters where practical.
- Use sentence case. Do not add tracked uppercase eyebrow labels.
- Do not emphasize a single word in a heading with a different color, weight, or italic style.

## Layout

- Default to left-aligned editorial composition.
- Use open sections and structural dividers instead of stacking identical cards.
- Rounded corners are reserved for compact controls or dialogs, not used as a universal motif.
- Numbering is used only for a real sequence, process, or timeline.

## Signature device

The **proof ledger** communicates Legacy Hub's difference. It records checks, supporting evidence, milestones, and client updates in a clear workflow. Other decorative devices should remain subordinate to it.

## Components

### Primary action

- Rectangular with a small radius or square corners
- Ghana forest background with white text
- Plain, specific action language
- Minimum 44px target size

### Secondary action

- Text link or simple border
- No automatic arrow suffix
- No decorative nested icon circle

### Cards

Cards are used only when the information is genuinely comparable or independently selectable, such as service packages and partner profiles. Prefer borders and spacing over shadows.

### Motion

- One restrained hero entrance is permitted.
- Scrolling alone does not trigger repeated fade-and-slide entrances.
- Interaction-driven motion is permitted for menus, dialogs, galleries, and state changes.
- Respect `prefers-reduced-motion`.

## Copy

- Explain what the user receives and what happens next.
- Use active voice and plain language.
- A CTA must match its outcome: “View packages,” “Request a consultation,” or “Send request.”
- Do not use vague labels such as “Experience Legacy Hub” or “Learn more.”

## Quality floor

- Visible keyboard focus
- Native buttons and dialogs where possible
- Focus restored after dialogs close
- 4.5:1 text contrast
- Responsive at 320px, 375px, 768px, 1024px, and 1440px
- No horizontal overflow
- No content hidden behind fixed navigation
- Reduced motion supported
