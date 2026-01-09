# **App Name**: ProteinZone Scroll

## Core Features:

- PNG Sequence Loading: Preload 40 PNG frames from /public/protein-sequence/ using programmatically generated paths and zero-padded numbering.
- Scroll-Driven Canvas Animation: Animate the PNG sequence on an HTML5 Canvas based on scroll progress (0 to 1 mapped to frame 0 to 39).
- Framer Motion Scroll Hook: Use Framer Motion's useScroll hook to track scroll progress.
- LERP Smoothing: Implement LERP (linear interpolation) smoothing for the animation to ensure a smooth, 60fps experience.
- Text Overlays with Fade In/Out: Display text overlays above the canvas that fade in and out based on scroll position (0%, 30%, 60%, 90%).
- Resize Handling: Maintain the aspect ratio and positioning of the image animation while properly re-scaling upon user resizing the browser window.
- Loading Spinner: Display a loading spinner until all PNG frames are preloaded.

## Style Guidelines:

- Primary color: A desaturated blue (#3498db converted to #2980b9) suggests reliability and cleanliness for a supplement brand, conveying a sense of trust and purity. Dark scheme selected to convey a modern premium feel.
- Background color: Deep charcoal (#050505) for a premium, dark-mode aesthetic.
- Accent color: Light blue (#29abe2) adds highlights and emphasizes key elements like CTAs, while harmonizing with the overall visual scheme.
- Font: 'Inter' (sans-serif) for headings (text-white/90) and body (text-white/60) for a modern, readable aesthetic.
- Parent scroll container height: h-[400vh].
- Canvas: sticky, top-0, h-screen, w-full.
- Smooth 60fps scrolling for a premium user experience.
- Minimal icons, if needed, with a focus on clarity and premium design. All icons to be white.