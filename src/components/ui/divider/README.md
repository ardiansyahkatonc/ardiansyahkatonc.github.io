# Divider

## Purpose
Visually separates content into distinct groups.

## Usage
```astro
import { Divider } from '@/components/ui/divider';

<Divider orientation="horizontal" />
```

## Props
- `orientation`: 'horizontal' | 'vertical'

## Accessibility
- Uses `role="separator"` for screen reader semantic meaning.
- Exposes `aria-orientation`.

## Do
- Use to logically break up long lists or content blocks.
## Don't
- Don't use purely for decorative spacing (use margins or layout utilities instead).
