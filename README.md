# 🎯 NgxWebTour

A beautiful, modern, and fully customizable product tour library for Angular applications. Create engaging user onboarding experiences with smooth animations and professional UI.

![Angular](https://img.shields.io/badge/Angular-13+-red.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

- 🎨 **Beautiful Modern UI** - Professional design with smooth animations
- 🎯 **Smart Auto-Positioning** - Automatically finds the best position for tooltips
- 🌈 **Backdrop & Highlight** - Focus user attention with backdrop overlay
- 📊 **Progress Tracking** - Visual progress bar and step counter
- 🎮 **Full Control** - Next, Previous, Done buttons with customizable text
- 📱 **Fully Responsive** - Works perfectly on all screen sizes
- 🔄 **Observable State** - Track tour progress with RxJS observables
- ⚙️ **Highly Customizable** - Configure every aspect of the tour
- 🚀 **Multiple Tours** - Support for multiple independent tours
- 💪 **Type Safe** - Full TypeScript support with IntelliSense
- 🪶 **Lightweight** - Zero external dependencies (except Angular & RxJS)
- 🌍 **i18n Ready** - Built-in support for 13+ languages

## 📦 Installation

```bash
npm install ngx-web-tour
```

## 🚀 Quick Start

### 1. Import Module

```typescript
import { NgxWebTourModule } from 'ngx-web-tour';

@NgModule({
  imports: [NgxWebTourModule],
})
export class AppModule {}
```

### 2. Add Tour Directive

```html
<button
  tour="welcome-tour"
  tourTitle="Get Started"
  tourText="Click here to begin your journey!"
  [tourPriority]="1"
>
  Start
</button>

<div
  tour="welcome-tour"
  tourTitle="Dashboard"
  tourText="View all your data in one place"
  [tourPriority]="2"
  tourPosition="bottom"
>
  Your Dashboard
</div>
```

### 3. Start the Tour

```typescript
import { TourService } from 'ngx-web-tour';

@Component({...})
export class AppComponent {
  constructor(private tourService: TourService) {}

  startTour() {
    this.tourService.start('welcome-tour');
  }
}
```

That's it! 🎉

## 📖 Documentation

- [Full Documentation](./projects/ngx-web-tour/README.md)
- [Examples](./EXAMPLES.md)
- [i18n Guide](./I18N.md)
- [Compatibility Guide](./COMPATIBILITY.md)
- [Changelog](./CHANGELOG.md)

## 🎨 Screenshots & Demo

### Beautiful Tooltip Design
Professional, modern tooltips with:
- Smooth animations and transitions
- Auto-positioning to fit viewport
- Progress indicator
- Customizable buttons
- Close button option

### Backdrop Highlight
Focus attention with:
- Overlay backdrop
- Highlighted element with pulse animation
- Click-outside to close option

## 🔧 Configuration Options

```typescript
this.tourService.configure({
  backdrop: true,
  backdropColor: 'rgba(0, 0, 0, 0.7)',
  closeOnBackdropClick: true,
  showProgress: true,
  allowClose: true,
  nextBtnText: 'Next →',
  prevBtnText: '← Back',
  doneBtnText: '✓ Done',
  animationDuration: 300,
});
```

## 📊 Track Tour State

```typescript
this.tourService.state$.subscribe(state => {
  console.log('Active:', state.isActive);
  console.log('Step:', state.currentStep + 1, '/', state.totalSteps);
  console.log('Tour:', state.tourName);
});
```

## 🎯 Directive Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `tour` | `string` | - | Tour identifier (required) |
| `tourText` | `string` | - | Step description (required) |
| `tourTitle` | `string` | - | Step title (optional) |
| `tourPriority` | `number` | `0` | Step order |
| `tourPosition` | `string` | `'auto'` | Tooltip position |
| `tourShowProgress` | `boolean` | `true` | Show progress bar |
| `tourAllowClose` | `boolean` | `true` | Show close button |

## 🛠️ Development

### Build Library

```bash
npm run build
```

### Run Tests

```bash
npm test
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## 📄 License

MIT License - feel free to use in your projects!

## ⭐ Show Your Support

If you find this library useful, please give it a ⭐ on GitHub!

---

Made with ❤️ for the Angular community
