# Card

## Purpose
Groups related information in a flexible, contained block.

## Usage
```astro
import { Card } from '@/components/ui/card';

<Card variant="outlined">
  <h3>Card Title</h3>
  <p>Content goes here.</p>
</Card>
```

## Props
- `variant`: 'default' | 'outlined' | 'interactive' | 'feature'
- `as`: HTML element to render (defaults to 'div', or 'a' if `href` is provided)
- `href`: Optional URL. If provided, renders an anchor tag.

## Accessibility
- When using `href` or `variant="interactive"`, ensure keyboard focusability.
- Use semantic headings inside the card content to maintain document outline.

## Do
- Use cards to logically chunk content.
## Don't
- Don't place nested interactive elements inside an interactive card without proper z-index and event handling.
