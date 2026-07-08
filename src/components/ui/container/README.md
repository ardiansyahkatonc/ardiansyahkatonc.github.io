# Container

## Purpose
Constrains content width and centers it predictably according to the layout system.

## Usage
```astro
import { Container } from '@/components/ui/container';

<Container size="md">
  Centered content goes here.
</Container>
```

## Props
- `size`: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'fluid'
- `as`: HTML element to render (default 'div')

## Accessibility
- Acts purely as a visual wrapper; does not disrupt semantic outline.

## Do
- Use to bound main content areas on large screens.
## Don't
- Don't use margin overrides on containers. Rely on layout system gaps.
