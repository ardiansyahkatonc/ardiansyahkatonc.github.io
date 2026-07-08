# Icon

## Purpose
Centralized wrapper for consistent icon rendering. Scales automatically to the parent font size.

## Usage
```astro
import { Icon } from '@/components/ui/icon';

<Icon name="check-circle" label="Success" />
```

## Props
- `name`: Identifier for the icon.
- `label`: Accessible label (optional).

## Accessibility
- If `label` is provided, it acts as a semantic image.
- If no `label` is provided, it is hidden from screen readers via `aria-hidden="true"`.

## Do
- Add a label when the icon conveys standalone meaning.
## Don't
- Don't set fixed sizes on icons directly. Let them scale with text.
