# 📁 Project Structure

```
ngx-web-tour/
├── projects/
│   └── ngx-web-tour/
│       ├── src/
│       │   ├── lib/
│       │   │   ├── components/
│       │   │   │   ├── tour-tooltip/
│       │   │   │   │   ├── tour-tooltip.component.ts
│       │   │   │   │   ├── tour-tooltip.component.html
│       │   │   │   │   └── tour-tooltip.component.scss
│       │   │   │   └── tour-backdrop/
│       │   │   │       ├── tour-backdrop.component.ts
│       │   │   │       ├── tour-backdrop.component.html
│       │   │   │       └── tour-backdrop.component.scss
│       │   │   ├── directives/
│       │   │   │   └── tour.directive.ts
│       │   │   ├── models/
│       │   │   │   └── tour-step.model.ts
│       │   │   ├── services/
│       │   │   │   └── tour.service.ts
│       │   │   └── ngx-web-tour.module.ts
│       │   └── public-api.ts
│       ├── package.json
│       └── README.md
├── CHANGELOG.md
├── EXAMPLES.md
├── README.md
└── package.json
```

## 📝 File Descriptions

### Core Files

#### `tour.service.ts`
Main service for managing tours. Handles:
- Tour registration and lifecycle
- Step navigation (next, previous, end)
- Component creation and destruction
- State management with RxJS
- Configuration management

#### `tour.directive.ts`
Directive for marking elements as tour steps. Supports:
- All tour step configurations
- Auto-registration with service
- Cleanup on destroy

#### `tour-step.model.ts`
TypeScript interfaces for:
- `TourStep` - Individual step configuration
- `TourConfig` - Global tour settings
- `TourState` - Current tour state

### Components

#### `tour-tooltip.component.ts/html/scss`
Professional tooltip component with:
- Auto-positioning logic
- Navigation buttons
- Progress indicator
- Close button
- Smooth animations
- Responsive design

#### `tour-backdrop.component.ts/html/scss`
Backdrop overlay component with:
- Element highlighting
- Pulse animation
- Click-outside detection
- Dynamic position updates
- Resize/scroll handling

### Module

#### `ngx-web-tour.module.ts`
Angular module that exports all components and directives.

#### `public-api.ts`
Public API surface - exports all public classes and interfaces.

### Documentation

#### `README.md` (root)
Main project documentation with quick start guide.

#### `README.md` (library)
Comprehensive API documentation with examples.

#### `EXAMPLES.md`
Multiple complete usage examples:
- Basic tour
- Advanced tour with state tracking
- Multiple tours
- Programmatic control
- Responsive design

#### `CHANGELOG.md`
Version history and release notes.

## 🎨 Design Features

### Tooltip Component
- Modern card design with shadows
- Smooth fade-in animations
- Smart arrow positioning
- Gradient progress bar
- Hover effects on buttons
- Responsive layout

### Backdrop Component
- Semi-transparent overlay
- Element cutout/highlight
- Pulse border animation
- Dynamic position tracking
- Smooth transitions

## 🔧 Technical Details

### Dependencies
- Angular 13+ (tested up to Angular 19)
- RxJS 6.5+ or 7+
- TypeScript 4.4+

### Build Output
- ES2022 modules
- Ivy partial compilation
- Tree-shakeable
- AOT compatible

### Bundle Size
- Lightweight (~15KB minified)
- Zero external dependencies
- Optimized for production

## 🚀 Usage Flow

1. Import `NgxWebTourModule`
2. Add `tour` directive to elements
3. Call `tourService.start('tour-name')`
4. Library handles everything:
   - Creates backdrop
   - Positions tooltip
   - Manages navigation
   - Tracks state
   - Cleans up on end
