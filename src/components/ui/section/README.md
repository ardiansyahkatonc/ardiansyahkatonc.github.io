# Section

## Purpose
A reusable section wrapper that defines major distinct vertical areas of a page.

## Usage
```astro
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';

<Section type="hero">
  <Container>
    <h1>Hero Title</h1>
  </Container>
</Section>
```

## Props
- `type`: 'default' | 'hero' | 'content' | 'feature' | 'cta' | 'footer'
- `as`: HTML element to render (defaults to 'section', or 'footer' if type is 'footer')

## Accessibility
- Uses semantic `<section>` or `<footer>` tags to create landmarks.
- Ensure each `<section>` has an accessible name, typically via an `aria-labelledby` pointing to its heading.

## Do
- Use sections to group content at the highest page level.
- Place a `Container` inside a `Section` to constrain content width.
## Don't
- Don't nest sections excessively.
- Don't add structural layout grids directly to the section tag; apply them to inner elements or containers.
