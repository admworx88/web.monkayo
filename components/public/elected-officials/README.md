# Elected Officials Module

A modular, maintainable implementation of the elected officials organizational chart following separation of concerns principles.

## 📁 File Structure

```
elected-officials/
├── index.tsx                          # Main export (use this for imports)
├── elected-officials-org-chart.tsx    # Main component
├── official-card.tsx                  # Individual official card component
├── card-patterns.tsx                  # Visual pattern components
├── connection-lines.tsx               # SVG connection line components
├── utils.ts                           # Utility functions
├── types.ts                           # TypeScript type definitions
├── styles.css                         # CSS animations and styles
└── README.md                          # This file
```

## 🚀 Usage

### Basic Usage

```tsx
import { ElectedOfficialsOrgChart } from "@/components/public/elected-officials";

export default function Page() {
  const officials = await getAllElectedOfficials();

  return <ElectedOfficialsOrgChart officials={officials} />;
}
```

### Using Individual Components

```tsx
import { OfficialCard } from "@/components/public/elected-officials";
import type { ElectedOfficial } from "@/components/public/elected-officials";

export function CustomOfficialDisplay({ official }: { official: ElectedOfficial }) {
  return (
    <OfficialCard
      official={official}
      size="standard"
      branding={branding}
      index={0}
    />
  );
}
```

## 📦 Components

### `ElectedOfficialsOrgChart`
Main component that displays the full organizational hierarchy.

**Props:**
- `officials: ElectedOfficial[]` - Array of elected officials

**Features:**
- Automatically parses hierarchy (Mayor → Vice Mayor → Councilors)
- Responsive layout (mobile: vertical stack, desktop: hierarchical chart)
- Animated connection lines
- Hover interactions with glow effects

### `OfficialCard`
Individual official card component.

**Props:**
- `official: ElectedOfficial` - Official data
- `size: "large" | "medium" | "standard"` - Card size variant
- `branding: any` - Branding context
- `index: number` - Card index for staggered animations
- `onHoverStart?: (id: string) => void` - Hover start callback
- `onHoverEnd?: () => void` - Hover end callback

**Features:**
- Art Deco sunburst pattern
- Dotted grid texture
- Elegant corner decorations
- Background logo with fade animation
- Cormorant Garamond typography for names
- Responsive sizing

### Card Patterns

Located in `card-patterns.tsx`:

- `DottedGridPattern` - Subtle dotted texture
- `SunburstPattern` - Art Deco radiating lines
- `BorderFiligree` - Geometric border decoration
- `CornerDecorations` - Elegant corner accents
- `CardBackgroundLogo` - Animated background logo

### Connection Lines

Located in `connection-lines.tsx`:

- `MobileConnectionLines` - Simple vertical lines for mobile
- `MayorToViceMayorLine` - Vertical connection (desktop)
- `ViceMayorToCouncilorsLines` - T-shaped connection (desktop)

## 🛠️ Utilities

Located in `utils.ts`:

### `parseHierarchy(officials: ElectedOfficial[])`
Parses array of officials into hierarchical structure.

**Returns:**
```ts
{
  mayor: ElectedOfficial | null,
  viceMayor: ElectedOfficial | null,
  councilors: ElectedOfficial[]
}
```

### `formatTerm(start: string | null, end: string | null)`
Formats term dates into readable string (e.g., "2022 – 2025").

### `getPortraitSizes(size: "large" | "medium" | "standard")`
Returns portrait and ring sizes based on card size variant.

### `getCardWidthClass(size: "large" | "medium" | "standard")`
Returns Tailwind width class for card size variant.

## 🎨 Styling

All CSS is located in `styles.css`:

### Animations
- `officialFadeIn` - Card entrance animation
- `lineDrawIn` - SVG line drawing animation
- `lineFlow` - Line flowing animation
- `pattern-shift` - Pattern shifting animation
- `pulse-slow` - Slow pulsing animation

### Key CSS Classes
- `.official-card` - Main card styles with hover effects
- `.portrait-ring` - Portrait border ring with hover scale
- `.card-logo-bg` - Background logo with fade animation
- `.card-dot-pattern` - Dotted grid pattern
- `.card-pattern` - Sunburst pattern container
- `.corner-accent` - Corner decorations
- `.line-glow-active` - Active line glow effect

### Accessibility
Respects `prefers-reduced-motion` media query:
- Disables all animations
- Removes transitions
- Sets static line positions

## 🔧 TypeScript Types

Located in `types.ts`:

- `ElectedOfficial` - Database row type
- `ElectedOfficialsOrgChartProps` - Main component props
- `OfficialHierarchy` - Parsed hierarchy structure
- `OfficialCardProps` - Card component props
- `ConnectionLinesProps` - Connection lines props
- `CardPatternsProps` - Card patterns props

## 📝 Development Guidelines

### Adding New Features

1. **New Pattern?** → Add to `card-patterns.tsx`
2. **New Line Type?** → Add to `connection-lines.tsx`
3. **New Utility?** → Add to `utils.ts`
4. **New Animation?** → Add to `styles.css`
5. **New Type?** → Add to `types.ts`

### Modifying Styles

All styles are in `styles.css`. Avoid inline styles except for:
- Dynamic branding colors
- Dynamic sizes based on props
- Unique SVG pattern IDs

### Code Organization Principles

- **Separation of Concerns**: Each file has a single responsibility
- **Reusability**: Components can be used independently
- **Maintainability**: Changes are localized to specific files
- **Type Safety**: All components are fully typed
- **Performance**: Animations use GPU-accelerated properties

## 🐛 Troubleshooting

### Styles Not Loading
Ensure `styles.css` is imported in `elected-officials-org-chart.tsx`:
```tsx
import "./styles.css";
```

### Connection Lines Not Showing
Check that:
1. Officials are properly parsed by `parseHierarchy()`
2. `hoveredOfficialId` state is managed correctly
3. SVG viewBox and dimensions are correct

### Patterns Not Visible
Check pattern opacity values in:
- `card-patterns.tsx` - Pattern component opacity
- `styles.css` - Hover state opacity changes

### TypeScript Errors
Ensure all imports use the barrel export:
```tsx
// ✅ Good
import { ElectedOfficialsOrgChart } from "@/components/public/elected-officials";

// ❌ Avoid
import { ElectedOfficialsOrgChart } from "@/components/public/elected-officials/elected-officials-org-chart";
```

## 📄 License

Part of the LGU Monkayo CMS project.
