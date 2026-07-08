import os

out_dir = r"d:\kat.on\src\components\ui"

components = {
    "button": {
        "astro": r"""---
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost' | 'text' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  class?: string;
  [x: string]: any;
}
const { variant = 'primary', size = 'medium', disabled = false, loading = false, type = 'button', class: className = '', ...rest } = Astro.props;
---
<button type={type} class:list={['katon-btn', `btn-${variant}`, `btn-${size}`, { disabled, loading }, className]} disabled={disabled || loading} aria-disabled={disabled || loading} {...rest}>
  {loading && <span class="spinner" aria-hidden="true"></span>}
  <span class="btn-content"><slot /></span>
</button>
<style>
  .katon-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-8);
    font-family: var(--font-primary);
    font-weight: var(--weight-medium);
    border: none;
    border-radius: var(--radius-medium);
    cursor: pointer;
    transition: all var(--motion-fast);
    outline: none;
    text-decoration: none;
  }
  .katon-btn:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }
  .katon-btn.disabled { opacity: 0.5; pointer-events: none; }
  
  /* Sizes */
  .btn-small { height: var(--space-32); padding-inline: var(--space-12); font-size: var(--text-body-sm); }
  .btn-medium { height: var(--space-48); padding-inline: var(--space-16); font-size: var(--text-body); }
  .btn-large { height: var(--space-64); padding-inline: var(--space-24); font-size: var(--text-body-lg); }

  /* Variants */
  .btn-primary { background-color: var(--color-primary); color: var(--color-surface); }
  .btn-primary:hover, .btn-primary:active { opacity: 0.9; }
  
  .btn-secondary { background-color: var(--color-secondary); color: var(--color-primary); border: var(--border-thin); }
  .btn-secondary:hover { background-color: var(--color-border); }
  
  .btn-ghost { background-color: transparent; color: var(--color-text-primary); }
  .btn-ghost:hover { background-color: var(--color-secondary); }
  
  .btn-text { background-color: transparent; color: var(--color-text-primary); padding: 0; height: auto; }
  .btn-text:hover { text-decoration: underline; }
  
  .btn-danger { background-color: var(--color-danger); color: var(--color-surface); }
  .btn-danger:hover { opacity: 0.9; }

  .spinner {
    width: 1em; height: 1em;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  @keyframes spin { 100% { transform: rotate(360deg); } }
</style>
""",
        "readme": r"""# Button

## Purpose
Triggers an action or event. Essential for interaction.

## Usage
```astro
import { Button } from '@/components/ui/button';

<Button variant="primary" size="medium">Click Me</Button>
```

## Props
- `variant`: 'primary' | 'secondary' | 'ghost' | 'text' | 'danger'
- `size`: 'small' | 'medium' | 'large'
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
"""
    },
    "badge": {
        "astro": r"""---
interface Props {
  variant?: 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  class?: string;
  [x: string]: any;
}
const { variant = 'neutral', class: className = '', ...rest } = Astro.props;
---
<span class:list={['katon-badge', `badge-${variant}`, className]} {...rest}>
  <slot />
</span>
<style>
  .katon-badge {
    display: inline-flex;
    align-items: center;
    padding: var(--space-4) var(--space-8);
    border-radius: var(--radius-full);
    font-size: var(--text-caption);
    font-weight: var(--weight-medium);
    font-family: var(--font-primary);
    line-height: 1;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .badge-neutral { background-color: var(--color-secondary); color: var(--color-text-secondary); border: var(--border-thin); }
  .badge-primary { background-color: var(--color-primary); color: var(--color-surface); }
  .badge-success { background-color: var(--color-success); color: var(--color-surface); }
  .badge-warning { background-color: var(--color-warning); color: var(--color-primary); }
  .badge-danger { background-color: var(--color-danger); color: var(--color-surface); }
  .badge-info { background-color: var(--color-info); color: var(--color-surface); }
</style>
""",
        "readme": r"""# Badge

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
"""
    },
    "card": {
        "astro": r"""---
interface Props {
  variant?: 'default' | 'outlined' | 'interactive' | 'feature' | 'product';
  class?: string;
  as?: string;
  href?: string;
  [x: string]: any;
}
const { variant = 'default', class: className = '', as: Tag = Astro.props.href ? 'a' : 'div', href, ...rest } = Astro.props;
---
<Tag href={href} class:list={['katon-card', `card-${variant}`, className]} {...rest}>
  <slot />
</Tag>
<style>
  .katon-card {
    display: block;
    background-color: var(--color-surface);
    border-radius: var(--radius-large);
    padding: var(--space-24);
    color: var(--color-text-primary);
    text-decoration: none;
    transition: transform var(--motion-normal), box-shadow var(--motion-normal);
  }
  .card-default { box-shadow: var(--shadow-sm); border: var(--border-thin); }
  .card-outlined { border: var(--border-default); background-color: transparent; }
  .card-interactive { box-shadow: var(--shadow-sm); border: var(--border-thin); cursor: pointer; }
  .card-interactive:hover, .card-interactive:focus-visible {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    outline: 2px solid var(--color-accent);
  }
  .card-feature { padding: var(--space-32); background-color: var(--color-secondary); border-radius: var(--radius-xl); border: none; }
  .card-product { box-shadow: var(--shadow-md); border-radius: var(--radius-medium); overflow: hidden; padding: 0; }
</style>
""",
        "readme": r"""# Card

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
- `variant`: 'default' | 'outlined' | 'interactive' | 'feature' | 'product'
- `as`: HTML element to render (defaults to 'div', or 'a' if `href` is provided)
- `href`: Optional URL. If provided, renders an anchor tag.

## Accessibility
- When using `href` or `variant="interactive"`, ensure keyboard focusability.
- Use semantic headings inside the card content to maintain document outline.

## Do
- Use cards to logically chunk content.
## Don't
- Don't place nested interactive elements inside an interactive card without proper z-index and event handling.
"""
    },
    "avatar": {
        "astro": r"""---
interface Props {
  src?: string;
  initials?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  class?: string;
  [x: string]: any;
}
const { src, initials, alt = 'Avatar', size = 'md', class: className = '', ...rest } = Astro.props;
---
<div class:list={['katon-avatar', `avatar-${size}`, className]} role="img" aria-label={alt} {...rest}>
  {src ? (
    <img src={src} alt={alt} class="avatar-img" loading="lazy" />
  ) : (
    <span class="avatar-initials">{initials}</span>
  )}
</div>
<style>
  .katon-avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-full);
    background-color: var(--color-secondary);
    color: var(--color-text-secondary);
    overflow: hidden;
    flex-shrink: 0;
  }
  .avatar-img { width: 100%; height: 100%; object-fit: cover; }
  .avatar-initials { font-family: var(--font-primary); font-weight: var(--weight-medium); }
  
  .avatar-sm { width: var(--space-32); height: var(--space-32); font-size: var(--text-caption); }
  .avatar-md { width: var(--space-48); height: var(--space-48); font-size: var(--text-body); }
  .avatar-lg { width: var(--space-80); height: var(--space-80); font-size: var(--text-h4); }
</style>
""",
        "readme": r"""# Avatar

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
"""
    },
    "divider": {
        "astro": r"""---
interface Props {
  orientation?: 'horizontal' | 'vertical';
  class?: string;
  [x: string]: any;
}
const { orientation = 'horizontal', class: className = '', ...rest } = Astro.props;
---
<div 
  class:list={['katon-divider', `divider-${orientation}`, className]} 
  role="separator" 
  aria-orientation={orientation}
  {...rest}
></div>
<style>
  .katon-divider {
    background-color: var(--color-border);
  }
  .divider-horizontal { width: 100%; height: 1px; margin-block: var(--space-24); }
  .divider-vertical { height: 100%; width: 1px; margin-inline: var(--space-24); display: inline-block; vertical-align: middle; }
</style>
""",
        "readme": r"""# Divider

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
"""
    },
    "icon": {
        "astro": r"""---
interface Props {
  name: string;
  class?: string;
  label?: string;
  [x: string]: any;
}
const { name, class: className = '', label, ...rest } = Astro.props;
---
<svg 
  class:list={['katon-icon', className]} 
  viewBox="0 0 24 24" 
  fill="none" 
  stroke="currentColor" 
  stroke-width="2" 
  stroke-linecap="round" 
  stroke-linejoin="round"
  aria-label={label}
  aria-hidden={label ? 'false' : 'true'}
  role={label ? 'img' : 'presentation'}
  {...rest}
>
  <!-- Placeholder. In a real system, you map `name` to an SVG path or use an icon registry. -->
  <circle cx="12" cy="12" r="10"></circle>
</svg>
<style>
  .katon-icon {
    display: inline-block;
    width: 1em;
    height: 1em;
    vertical-align: middle;
  }
</style>
""",
        "readme": r"""# Icon

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
"""
    },
    "surface": {
        "astro": r"""---
interface Props {
  variant?: 'primary' | 'secondary' | 'elevated';
  as?: string;
  class?: string;
  [x: string]: any;
}
const { variant = 'primary', as: Tag = 'div', class: className = '', ...rest } = Astro.props;
---
<Tag class:list={['katon-surface', `surface-${variant}`, className]} {...rest}>
  <slot />
</Tag>
<style>
  .katon-surface {
    color: var(--color-text-primary);
  }
  .surface-primary { background-color: var(--color-background); }
  .surface-secondary { background-color: var(--color-secondary); }
  .surface-elevated { background-color: var(--color-surface); box-shadow: var(--shadow-lg); border: var(--border-thin); border-radius: var(--radius-large); }
</style>
""",
        "readme": r"""# Surface

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
"""
    },
    "container": {
        "astro": r"""---
interface Props {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'fluid';
  as?: string;
  class?: string;
  [x: string]: any;
}
const { size = 'lg', as: Tag = 'div', class: className = '', ...rest } = Astro.props;
---
<Tag class:list={[`container-${size}`, className]} {...rest}>
  <slot />
</Tag>
<!-- Note: Styles are provided globally by layout.css -->
""",
        "readme": r"""# Container

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
"""
    }
}

for name, files in components.items():
    comp_dir = os.path.join(out_dir, name)
    os.makedirs(comp_dir, exist_ok=True)
    
    comp_name_cap = name.capitalize()
    
    with open(os.path.join(comp_dir, f"{comp_name_cap}.astro"), "w", encoding="utf-8") as f:
        f.write(files["astro"])
        
    with open(os.path.join(comp_dir, "index.ts"), "w", encoding="utf-8") as f:
        f.write(f"export {{ default as {comp_name_cap} }} from './{comp_name_cap}.astro';\n")
        
    with open(os.path.join(comp_dir, "README.md"), "w", encoding="utf-8") as f:
        f.write(files["readme"])

print("UI Components generated successfully.")
