# Surface

## Purpose
Provides a foundational layer for grouping content with consistent backgrounds and elevation.

## Usage
```astro
import { Surface } from '@/components/ui/surface';

<Surface variant="elevated">
  Content on an elevated background.
</Surface>
```

## Props
- `variant`: 'primary' | 'secondary' | 'elevated'
- `as`: HTML element to render (default 'div')

## Accessibility
- Ensure contrast ratios between the surface background and its content.

## Do
- Use surfaces to separate distinct layout regions visually.
## Don't
- Don't over-nest elevated surfaces, which clutters the visual hierarchy.
