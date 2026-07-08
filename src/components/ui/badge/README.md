# Badge

## Purpose
Displays a small visual indicator for status, categories, or labels.

## Usage
```astro
import { Badge } from '@/components/ui/badge';

<Badge variant="success">Active</Badge>
```

## Props
- `variant`: 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info'

## Accessibility
- Use as supplementary information.
- If it conveys critical status, ensure the context is also provided to screen readers.

## Do
- Keep text extremely short (1-2 words).
- Use semantic colors correctly (danger for errors, success for completion).
## Don't
- Don't use badges for interactive elements or buttons.
