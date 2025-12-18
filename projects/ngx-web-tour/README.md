# NgxWebTour

A beautiful, customizable, and easy-to-use product tour library for Angular 13+ applications.

## ✨ Features

- 🎨 **Beautiful UI** - Modern, professional design with smooth animations
- 🎯 **Smart Positioning** - Auto-detects best position for tooltips
- 📱 **Responsive** - Works perfectly on mobile, tablet, and desktop
- 🌈 **Customizable** - Full control over styling and behavior
- 🔄 **Observable State** - Track tour state with RxJS
- 🎭 **Backdrop Highlight** - Focus user attention on important elements
- ⚡ **Lightweight** - No external dependencies except Angular and RxJS
- 🔒 **Type Safe** - Full TypeScript support

## 📦 Installation

```bash
npm install ngx-web-tour
```

## 🚀 Quick Start

### 1. Import the Module

```typescript
import { NgxWebTourModule } from 'ngx-web-tour';

@NgModule({
  imports: [NgxWebTourModule],
})
export class AppModule {}
```

### 2. Add Tour Directive to Elements

```html
<button
  tour="my-tour"
  tourText="Click here to get started!"
  tourTitle="Welcome"
  [tourPriority]="1"
>
  Start
</button>

<div
  tour="my-tour"
  tourText="This is your dashboard where you can see all your data."
  tourTitle="Dashboard"
  [tourPriority]="2"
  tourPosition="bottom"
>
  Dashboard Content
</div>

<button
  tour="my-tour"
  tourText="Click here when you're done!"
  tourTitle="Finish"
  [tourPriority]="3"
>
  Finish
</button>
```

### 3. Start the Tour

```typescript
import { Component } from '@angular/core';
import { TourService } from 'ngx-web-tour';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private tourService: TourService) {}

  startTour(): void {
    this.tourService.start('my-tour');
  }
}
```

## 📖 API Documentation

### Directive Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `tour` | `string` | - | **Required.** Tour name/identifier |
| `tourText` | `string` | - | **Required.** Description text for the step |
| `tourTitle` | `string` | - | Optional title for the step |
| `tourPriority` | `number` | `0` | Step order (lower numbers show first) |
| `tourPosition` | `'top' \| 'bottom' \| 'left' \| 'right' \| 'auto'` | `'auto'` | Tooltip position |
| `tourShowProgress` | `boolean` | `true` | Show progress bar |
| `tourAllowClose` | `boolean` | `true` | Show close button |
| `tourNextBtnText` | `string` | `'Next'` | Custom text for next button |
| `tourPrevBtnText` | `string` | `'Previous'` | Custom text for previous button |
| `tourDoneBtnText` | `string` | `'Done'` | Custom text for done button |

### TourService Methods

#### `start(tourName: string, config?: Partial<TourConfig>): void`
Start a tour with optional configuration.

```typescript
this.tourService.start('my-tour', {
  backdrop: true,
  backdropColor: 'rgba(0, 0, 0, 0.7)',
  showProgress: true,
});
```

#### `next(): void`
Move to the next step.

#### `previous(): void`
Move to the previous step.

#### `end(): void`
End the current tour.

#### `configure(config: Partial<TourConfig>): void`
Set default configuration for all tours.

```typescript
this.tourService.configure({
  backdrop: true,
  showProgress: true,
  allowClose: true,
  nextBtnText: 'Next →',
  prevBtnText: '← Back',
  doneBtnText: '✓ Done',
});
```

#### `state$: Observable<TourState>`
Observable for tracking tour state.

```typescript
this.tourService.state$.subscribe(state => {
  console.log('Is active:', state.isActive);
  console.log('Current step:', state.currentStep);
  console.log('Total steps:', state.totalSteps);
});
```

### Configuration Options

```typescript
interface TourConfig {
  backdrop?: boolean;                    // Show backdrop overlay
  backdropColor?: string;                // Backdrop color
  closeOnBackdropClick?: boolean;        // Close tour when clicking backdrop
  showProgress?: boolean;                // Show progress indicator
  allowClose?: boolean;                  // Show close button
  nextBtnText?: string;                  // Default next button text
  prevBtnText?: string;                  // Default previous button text
  doneBtnText?: string;                  // Default done button text
  skipBtnText?: string;                  // Default skip button text
  animationDuration?: number;            // Animation duration in ms
}
```

## 🎨 Customization

### Custom Styling

Override CSS variables to customize the appearance:

```css
:root {
  --ngx-tour-primary: #4f46e5;
  --ngx-tour-text: #1f2937;
  --ngx-tour-background: #ffffff;
  --ngx-tour-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}
```

### Multiple Tours

You can have multiple independent tours:

```html
<!-- Onboarding Tour -->
<div tour="onboarding" tourText="Welcome!" [tourPriority]="1"></div>

<!-- Feature Tour -->
<div tour="features" tourText="Check out this feature!" [tourPriority]="1"></div>
```

```typescript
this.tourService.start('onboarding');
// or
this.tourService.start('features');
```

## 📱 Examples

### Basic Example

```typescript
@Component({
  template: `
    <button (click)="startTour()">Start Tour</button>
    
    <div tour="demo" tourText="This is step 1" [tourPriority]="1">
      Step 1
    </div>
    
    <div tour="demo" tourText="This is step 2" [tourPriority]="2">
      Step 2
    </div>
  `
})
export class DemoComponent {
  constructor(private tourService: TourService) {}
  
  startTour() {
    this.tourService.start('demo');
  }
}
```

### Advanced Example with State Tracking

```typescript
@Component({
  template: `
    <button (click)="startTour()" [disabled]="isActive">
      {{ isActive ? 'Tour Active...' : 'Start Tour' }}
    </button>
    
    <div *ngIf="isActive" class="tour-progress">
      Step {{ currentStep + 1 }} of {{ totalSteps }}
    </div>
  `
})
export class AdvancedComponent implements OnInit, OnDestroy {
  isActive = false;
  currentStep = 0;
  totalSteps = 0;
  
  private destroy$ = new Subject<void>();
  
  constructor(private tourService: TourService) {}
  
  ngOnInit() {
    this.tourService.state$
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => {
        this.isActive = state.isActive;
        this.currentStep = state.currentStep;
        this.totalSteps = state.totalSteps;
      });
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  startTour() {
    this.tourService.start('advanced-tour', {
      backdrop: true,
      closeOnBackdropClick: false,
    });
  }
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License

## 🌟 Show Your Support

If you like this project, please give it a ⭐ on GitHub!

Once the project is built, you can publish your library by following these steps:

1. Navigate to the `dist` directory:
   ```bash
   cd dist/ngx-web-tour
   ```

2. Run the `npm publish` command to publish your library to the npm registry:
   ```bash
   npm publish
   ```

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
