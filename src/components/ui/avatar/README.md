# Avatar

## Purpose
Represents a user or entity visually using an image or initials.

## Usage
```astro
import { Avatar } from '@/components/ui/avatar';

<Avatar src="/user.jpg" alt="Jane Doe" size="md" />
```

## Props
- `src`: Image URL.
- `initials`: Fallback initials if src is missing.
- `alt`: Accessibility label.
- `size`: 'sm' | 'md' | 'lg'

## Accessibility
- `role="img"` is applied to the wrapper.
- Requires a descriptive `alt` prop for screen readers.

## Do
- Provide an `alt` description.
- Provide `initials` as a fallback if the image fails.
## Don't
- Don't use decorative avatars without `alt` context if they represent content.
