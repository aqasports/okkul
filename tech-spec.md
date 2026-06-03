# OKKUL 3D — Technical Specification

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | `^19.0.0` | UI framework |
| `react-dom` | `^19.0.0` | React DOM renderer |
| `vite` | `^6.0.0` | Build tool |
| `@vitejs/plugin-react` | `^4.4.0` | Vite React plugin |
| `tailwindcss` | `^4.0.0` | Utility CSS |
| `typescript` | `^5.7.0` | Type safety |
| `@types/react` | `^19.0.0` | React type defs |
| `@types/react-dom` | `^19.0.0` | ReactDOM type defs |
| `three` | `^0.172.0` | 3D engine |
| `@react-three/fiber` | `^9.0.0` | React Three.js renderer |
| `@react-three/drei` | `^10.0.0` | R3F helpers (Text, Environment, ContactShadows) |
| `@react-spring/three` | `^10.0.0` | Spring animations for 3D |
| `gsap` | `^3.12.0` | Scroll-triggered animations, timelines |
| `lenis` | `^1.2.0` | Smooth scrolling |
| `lucide-react` | `^0.469.0` | SVG icons |

**Font Loading:**
- Google Fonts CDN: `Outfit:wght@300;400;500;700;900` + `JetBrains+Mono:wght@400;500;700`
- 3D Text: Use `@react-three/drei`'s `<Text>` component with `font` prop pointing to a loaded bold font URL. No facetype.js JSON needed — drei Text uses troika-three-text under the hood.

---

## Component Inventory

### Layout Components

| Component | Source | Notes |
|-----------|--------|-------|
| `Navigation` | Custom | Fixed header, mobile hamburger overlay |
| `Footer` | Custom | 3-column grid, links, WhatsApp CTA |
| `PageLoader` | Custom | Full-screen loading overlay |
| `ScrollProgress` | Custom | Fixed top bar, width tied to scroll |
| `CustomCursor` | Custom | Desktop-only dot + ring |
| `StructuralFrame` | Custom | Fixed vertical border lines |

### Section Components

| Component | Source | Notes |
|-----------|--------|-------|
| `HeroSection` | Custom | Split layout: text left, 3D wordmark right |
| `HeroTerminal` | Custom | Embedded in hero right zone |
| `StatsStrip` | Custom | 4-column stat grid with count-up |
| `ProductsSection` | Custom | Header + 2x2 product card grid |
| `AppSurMesureSection` | Custom | 2-col with sector selector + terminal |
| `AutomateSection` | Custom | 2-col with pipeline animation |
| `RayasSection` | Custom | 2-col with 4-tab dashboard |
| `SayahSection` | Custom | 2-col with 3-tab control center |
| `RoiCalculatorSection` | Custom | 2-col with sliders + output cards |
| `ProcessSection` | Custom | 4-column phase cards |
| `ContactSection` | Custom | Centered form + success pane |

### 3D Components

| Component | Source | Notes |
|-----------|--------|-------|
| `NeuralConstellation` | Custom + three | Global 3D background canvas |
| `OkkulWordmark` | Custom + drei | Hero 3D text sculpture |
| `WireframeMesh` | Custom + three | Section panel wireframe backgrounds |

### Reusable Components

| Component | Source | Used By |
|-----------|--------|---------|
| `SectionHeader` | Custom | All sections — label + title + optional info box |
| `TerminalPanel` | Custom | Hero, AppSurMesure, Automate, Rayas, Sayah |
| `InteractiveCard` | Custom | Product cards — 3D tilt hover |
| `MonoBadge` | Custom | Status labels, tags throughout |
| `Slider` | Custom | ROI calculator inputs |
| `WaveformBars` | Custom | Hero terminal, SAYAH simulator |
| `ConsoleLogs` | Custom | Hero terminal, SAYAH scenarios |

### Hooks

| Hook | Purpose |
|------|---------|
| `useMousePosition` | Normalized mouse coords for 3D interaction + custom cursor |
| `useScrollProgress` | Scroll percentage [0,1] for progress bar + constellation |
| `useIntersectionReveal` | IntersectionObserver for section entrance animations |

---

## Animation Implementation

| Animation | Library | Implementation Approach | Complexity |
|-----------|---------|------------------------|------------|
| **Neural Constellation** (particles, connections, bloom) | `@react-three/fiber` + `three` + `@react-three/postprocessing` | Custom `Points` with `BufferGeometry`, `LineSegments` for connections updated every 5 frames, `BloomEffect` in `EffectComposer`. Mouse repulsion via raycasting to Z=0 plane. | 🔒 High |
| **3D OKKUL Wordmark** (idle float, hover, click) | `@react-three/fiber` + `@react-spring/three` | `useFrame` for continuous rotation/float. `@react-spring/three` `useSpring` for hover scale. GSAP for click rotation pulse. `MeshPhysicalMaterial` with `Environment` for metal. | 🔒 High |
| **Section Entrance Reveals** | `gsap` + ScrollTrigger | Single `gsap.from()` per section triggered at `top 80%`. Stagger children with `stagger: 0.15`. Shared `useIntersectionReveal` hook. | Low |
| **Stats Count-Up** | `gsap` | `gsap.to()` on a proxy object, update DOM in `onUpdate`. Triggered by ScrollTrigger. | Low |
| **Pipeline Step Cycle** | React `setInterval` + CSS transitions | State-driven active step index, `setInterval` at 2500ms. CSS transitions handle visual changes (border, opacity, scale). | Medium |
| **Waveform Bars** | React `setInterval` | Random height assignment every 90ms. Two modes: idle (low, dim) and active (tall, bright). | Low |
| **Hero Console Logs** | React `setInterval` | Cycle through log array every 2800ms. CSS fade-in on new entries. Old entries removed after 5 items. | Low |
| **SAYAH Call Scenarios** | React `setInterval` | Typewriter-style log playback every 2000ms. Speaker-based color coding. Waveform switches to active mode. | Medium |
| **Sector Content Switch** | CSS transition | `opacity` transition on content container. React state drives which sector data renders. | Low |
| **Page Loader** | CSS animation + React state | Progress bar fill via CSS `@keyframes`. Status text cycling via `setInterval`. Fade-out via CSS class toggle after 2300ms. | Low |
| **Custom Cursor** | React `useEffect` + mousemove | Direct `style.left/top` manipulation. `requestAnimationFrame` for smooth ring follow. | Low |
| **Scroll Progress Bar** | React `useEffect` + scroll event | `scrollY / (scrollHeight - clientHeight)` mapped to width percentage. | Low |
| **Product Card 3D Tilt** | CSS `transform` + `perspective` | `onMouseMove` calculates rotateX/Y from cursor position within card. CSS transition for smoothness. | Low |
| **Contact Form Success** | React state + CSS | Toggle between form and success pane. Success pane auto-hides after 6s via `setTimeout`. | Low |
| **Training Upload Simulation** | React `setInterval` | Progress bar fills over ~2s. Training logs append every 800ms after upload completes. | Medium |
| **Tab Switchers (RAYAS/SAYAH)** | React state | State-driven visible pane. CSS fade transition. Button style toggle. | Low |

---

## State & Logic

### Neural Constellation Architecture

The constellation is a single R3F `<Canvas>` at `position: fixed; inset: 0; z-index: 0`. All page content sits above it. This creates a unified 3D background that persists across sections.

**Critical decisions:**
- Single Canvas (not per-section) — ensures visual continuity and avoids mount/unmount overhead
- Particle positions stored in a `useRef` Float32Array for mutation in `useFrame` without re-renders
- Connection lines recalculated every 5 frames via modulo check (`frameCount % 5 === 0`)
- Mouse position passed via shared ref (not state) to avoid re-renders on every mousemove
- Mobile: halve particle count, skip connections, disable bloom via device detection

### 3D Wordmark Isolation

The hero wordmark needs its own lighting environment distinct from the constellation. Options:

**Chosen approach:** Render wordmark IN the same Canvas as the constellation, but in a separate `<group>` with its own lights. The wordmark uses a local `pointLight` + `directionalLight` while the constellation relies on ambient + self-illumination. Camera position `[0, 0, 8]` keeps both visible.

**Alternative (rejected):** Separate Canvas for wordmark — would cause z-index conflicts and double WebGL contexts.

### Scroll-Camera Sync

Lenis scroll progress drives two effects:
1. **Constellation camera Z:** Map scroll `[0,1]` to `[8, 12]` via `useLenis` callback
2. **Rotation speed multiplier:** Map scroll velocity to `[1, 2]`

Use `useRef` for camera position mutations in `useFrame`, not React state.

### Section Wireframe Backgrounds

Each deep-dive section's right panel has a subtle wireframe. These are rendered as separate `<Canvas>` elements scoped to each panel container (using `position: absolute; inset: 0` on the canvas, panel content above). This avoids cluttering the main constellation canvas with many small wireframes.

---

## Other Key Decisions

**No shadcn/ui components needed.** The design is entirely custom industrial-cyber UI with monospace labels, border-based chrome, and no standard form patterns. All inputs, buttons, and cards are custom-styled with Tailwind.

**No routing.** Single-page site with anchor scroll navigation.

**Asset generation:** No images/videos needed — all visuals are procedural (3D, particles, CSS gradients, SVG icons). This is intentional per the design.

**Font for 3D text:** Use `@react-three/drei`'s `<Text>` component with a Google Fonts URL for Outfit Black (`https://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4TC1C4G-EiAou6Y.woff2`). Drei's Text uses troika-three-text which handles font loading natively — no JSON conversion needed.
