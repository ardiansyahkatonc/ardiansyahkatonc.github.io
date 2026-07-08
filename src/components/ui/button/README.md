# Button

## Purpose
Triggers an action or event. Essential for interaction.

## Usage
```astro
import { Button } from '@/components/ui/button';

<Button variant="primary" size="md">Click Me</Button>
```

## Props
- `variant`: 'primary' | 'secondary' | 'ghost' | 'text'
- `size`: 'sm' | 'md' | 'lg'
- `disabled`: boolean
- `loading`: boolean
- `type`: 'button' | 'submit' | 'reset'

## Accessibility
- Uses semantic `<button>` tag.
- Keyboard accessible with visible focus rings.
- Uses `aria-disabled` and disables pointer events when `disabled` or `loading` is true.
- Screen readers announce loading states via aria-hidden on spinner.

## Do
- Use primary buttons for the main action on the page.
- Keep labels concise and action-oriented.
## Don't
- Don't use multiple primary buttons in the same view.
- Don't use buttons for navigation links (use standard `<a>` tags).
