# Portfolio Project - AI Coding Instructions

## Project Overview
A React 19 + TypeScript + Vite portfolio showcasing creative visual effects using WebGL shaders, Three.js, and motion animations. Focus on performance-optimized retro/cyberpunk aesthetics with custom shader effects.

## Tech Stack & Core Dependencies
- **Framework**: React 19.1.1 (latest) with Vite 7.x build system
- **Styling**: Tailwind CSS v4 (using new `@tailwindcss/vite` plugin, not traditional PostCSS setup)
- **3D Graphics**: Three.js + @react-three/fiber for WebGL rendering
- **Shaders**: OGL (lightweight WebGL library) for custom effects
- **Animation**: `motion` (formerly Framer Motion) for declarative animations
- **UI Components**: shadcn/ui pattern (components.json configured with "new-york" style)

## Architecture Patterns

### Component Structure
Components are organized by functionality in `src/components/`:
- **Visual Effects Components**: Custom shader-based effects (DarkVeil, ASCIIText, Dither)
- **Animation Components**: Motion-based scroll/interaction effects (ScrollVelocity, FadingIcons)
- Each visual component encapsulates its own WebGL/shader logic

### Shader Component Pattern
Visual effects follow a consistent pattern (see `DarkVeil.tsx`, `ASCIIText.tsx`):
1. Define vertex/fragment shaders as string constants at top of file
2. Use refs to access canvas elements (`useRef<HTMLCanvasElement>()`)
3. Initialize renderers in `useEffect` with cleanup
4. Expose tunable parameters as component props (hueShift, speed, intensity, etc.)
5. Handle window resize with ResizeObserver for responsive rendering

**Example** (`DarkVeil.tsx`):
```tsx
// Shaders defined as template strings
const fragment = `...GLSL code...`;

export default function DarkVeil({ 
  hueShift = 0, 
  noiseIntensity = 0,
  // ... tunable parameters
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    // Renderer setup with cleanup
  }, []);
}
```

### Z-Index Layering Strategy
`App.tsx` demonstrates the layering architecture:
- **z-0**: Fixed background effects (DarkVeil)
- **z-5**: Mid-layer scrollable content
- **z-10**: Main scrollable content
- **z-20**: Foreground fixed elements (ASCIIText)
- Use `pointer-events-none` to allow mouse interaction to pass through layers

### Path Aliases
Configured in both `vite.config.ts` and `tsconfig.json`:
```typescript
"@/*" → "src/*"
"ui/*" → "src/components/ui/*"
```
Always use `@/` imports for cross-module references.

## Development Workflows

### Commands
```bash
npm run dev          # Dev server with HMR
npm run build        # Production build
npm run typecheck    # TypeScript validation (no emit)
npm run lint         # ESLint check
npm run preview      # Preview production build
```

### Tailwind v4 Specific
- Uses new `@import "tailwindcss"` syntax in `index.css` (not traditional `@tailwind` directives)
- Plugin system: `@plugin "tailwindcss-animate"` instead of `require()` in config
- Config at `tailwind.config.cjs` but minimal - most configuration via CSS
- `@tailwindcss/vite` handles compilation directly in Vite pipeline

### Adding UI Components
Project uses shadcn/ui conventions (`components.json`):
- Place reusable UI in `src/components/ui/`
- Use `cn()` utility from `@/lib/utils` for conditional classes
- Icon library: `lucide-react` (already installed)

## Critical Conventions

### Shader Uniforms Naming
Follow GLSL naming conventions in shader code:
- `u` prefix for uniforms: `uTime`, `uResolution`, `uHueShift`
- camelCase in TypeScript props → match in shader uniform names
- Always pass resolution as `vec2` for aspect ratio calculations

### Canvas Sizing
All canvas-based components must:
1. Match parent container size (`canvas.width = parent.offsetWidth * PX_RATIO`)
2. Use `window.devicePixelRatio` (or `PX_RATIO` constant) for crisp rendering
3. Handle resize with ResizeObserver, not window events
4. Set explicit canvas style dimensions separate from buffer size

### Motion Animation
Using `motion` v12 (not `framer-motion`):
- Import from `"motion/react"` not `"framer-motion"`
- Velocity-based animations use `useVelocity()` + `useSpring()`
- Scroll tracking: `useScroll()` with optional container ref
- See `ScrollVelocity.tsx` for scroll-linked animation pattern

### TypeScript Strictness
- `"noEmit": true` in typecheck config (type validation only)
- All shader code typed as plain strings (no special typing needed)
- Canvas refs: `useRef<HTMLCanvasElement>(null)`, renderer refs: `useRef<Renderer>(null)`

## Performance Considerations

### Shader Resolution Scaling
Components expose `resolutionScale` prop (default 1.0):
- Lower values (0.5-0.75) for performance on weak GPUs
- Applied to canvas buffer size, not style size

### Animation Frame Management
- Use `requestAnimationFrame` in shader components for render loops
- Store RAF ID in ref: `useRef<number | null>(null)`
- Always cancel RAF in cleanup: `if (rafId) cancelAnimationFrame(rafId)`

### Background Prevention Pattern
To prevent white flash on load (see `index.css` + `App.tsx`):
- Set black background color on html/body elements in CSS with `!important`
- Add explicit `bg-black` Tailwind class on root div in App.tsx
- This prevents white flash during initial page render

## Common Pitfalls

1. **Don't use PostCSS `@tailwind` directives** - v4 uses `@import "tailwindcss"`
2. **Three.js imports** - Import from `'three'`, not `'@react-three/fiber'` for core classes
3. **OGL vs Three.js** - `DarkVeil` uses OGL (`Renderer`, `Program`, `Mesh`), not Three.js - don't mix
4. **Motion imports** - Package is `"motion"` not `"framer-motion"` in this project
5. **Empty components** - `FadingIcons.tsx` exists but is empty; placeholder for future work

## File Organization
```
src/
├── components/          # All React components
│   ├── ASCIIText.tsx   # THREE.js shader text effect
│   ├── DarkVeil.tsx    # OGL background shader
│   ├── Dither.tsx      # R3F post-processing effect
│   ├── ScrollVelocity.tsx  # Motion scroll animation
│   └── ui/             # shadcn/ui components (when added)
├── lib/
│   └── utils.ts        # Tailwind merge utility (cn)
└── types/
    └── index.d.ts      # Global type declarations
```

## When Adding Features

### New Shader Effect
1. Create component in `src/components/[EffectName].tsx`
2. Define shaders as const strings at top
3. Follow the DarkVeil pattern: ref → useEffect → cleanup
4. Expose tunable params as props with sensible defaults
5. Use ResizeObserver for responsive sizing

### New Animation
1. Import from `"motion/react"`
2. Use `useScroll()` for scroll-based effects
3. Use `useSpring()` to smooth velocity/scroll values
4. Memoize expensive calculations with `useMemo`

### New UI Component
1. Add to `src/components/ui/`
2. Use `cn()` for conditional styling
3. Follow shadcn/ui patterns (see components.json)
4. Use Lucide React for icons
