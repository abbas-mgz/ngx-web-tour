# NgxWebTour - Examples

## Basic Tour Example

```typescript
import { Component } from '@angular/core';
import { TourService } from 'ngx-web-tour';

@Component({
  selector: 'app-demo',
  template: `
    <div class="demo-container">
      <button class="start-btn" (click)="startTour()">
        Start Tour
      </button>

      <header
        tour="demo-tour"
        tourTitle="Navigation"
        tourText="This is the main navigation bar where you can access different sections."
        [tourPriority]="1"
        tourPosition="bottom"
      >
        <h1>My Application</h1>
      </header>

      <aside
        tour="demo-tour"
        tourTitle="Sidebar"
        tourText="Use this sidebar to quickly navigate between your projects."
        [tourPriority]="2"
        tourPosition="right"
      >
        <ul>
          <li>Dashboard</li>
          <li>Projects</li>
          <li>Settings</li>
        </ul>
      </aside>

      <main
        tour="demo-tour"
        tourTitle="Main Content"
        tourText="This is where your main content appears. You can view and manage your data here."
        [tourPriority]="3"
        tourPosition="top"
      >
        <h2>Dashboard</h2>
        <p>Welcome to your dashboard!</p>
      </main>

      <button
        tour="demo-tour"
        tourTitle="Actions"
        tourText="Click here to perform important actions. You're all set!"
        [tourPriority]="4"
        tourPosition="left"
        tourDoneBtnText="Got it! 🎉"
      >
        Take Action
      </button>
    </div>
  `,
  styles: [`
    .demo-container {
      padding: 20px;
    }
    .start-btn {
      padding: 12px 24px;
      background: #4f46e5;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }
  `]
})
export class DemoComponent {
  constructor(private tourService: TourService) {}

  startTour(): void {
    this.tourService.start('demo-tour');
  }
}
```

## Advanced Tour with Custom Configuration

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TourService } from 'ngx-web-tour';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-advanced-demo',
  template: `
    <div class="app-container">
      <!-- Tour Control Panel -->
      <div class="tour-controls">
        <button (click)="startCustomTour()" [disabled]="tourState.isActive">
          Start Custom Tour
        </button>
        
        <div *ngIf="tourState.isActive" class="tour-status">
          <p>Tour Active: {{ tourState.tourName }}</p>
          <p>Progress: {{ tourState.currentStep + 1 }} / {{ tourState.totalSteps }}</p>
          <button (click)="endTour()">End Tour</button>
        </div>
      </div>

      <!-- Tour Steps -->
      <div
        tour="custom-tour"
        tourTitle="🚀 Welcome"
        tourText="Let's take a quick tour of the main features!"
        [tourPriority]="1"
        [tourShowProgress]="true"
      >
        Welcome Section
      </div>

      <div
        tour="custom-tour"
        tourTitle="📊 Analytics"
        tourText="View your analytics and insights here. Track your progress over time."
        [tourPriority]="2"
        tourPosition="bottom"
      >
        Analytics Dashboard
      </div>

      <div
        tour="custom-tour"
        tourTitle="⚙️ Settings"
        tourText="Customize your experience in the settings panel."
        [tourPriority]="3"
        tourPosition="left"
        tourNextBtnText="Continue →"
        tourPrevBtnText="← Go Back"
      >
        Settings Panel
      </div>
    </div>
  `,
})
export class AdvancedDemoComponent implements OnInit, OnDestroy {
  tourState = {
    isActive: false,
    currentStep: 0,
    totalSteps: 0,
    tourName: null as string | null,
  };

  private destroy$ = new Subject<void>();

  constructor(private tourService: TourService) {}

  ngOnInit(): void {
    // Subscribe to tour state changes
    this.tourService.state$
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => {
        this.tourState = state;
        console.log('Tour state updated:', state);
      });

    // Configure default settings
    this.tourService.configure({
      backdrop: true,
      backdropColor: 'rgba(0, 0, 0, 0.75)',
      closeOnBackdropClick: false,
      showProgress: true,
      allowClose: true,
      animationDuration: 300,
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  startCustomTour(): void {
    this.tourService.start('custom-tour', {
      nextBtnText: 'Next Step →',
      prevBtnText: '← Previous',
      doneBtnText: '✓ Finish Tour',
    });
  }

  endTour(): void {
    this.tourService.end();
  }
}
```

## Multiple Tours Example

```typescript
@Component({
  selector: 'app-multi-tour',
  template: `
    <div>
      <button (click)="tourService.start('onboarding')">
        Start Onboarding
      </button>
      <button (click)="tourService.start('features')">
        Start Features Tour
      </button>

      <!-- Onboarding Tour -->
      <div tour="onboarding" tourText="Welcome to our app!" [tourPriority]="1">
        Step 1
      </div>
      <div tour="onboarding" tourText="Here's how to get started" [tourPriority]="2">
        Step 2
      </div>

      <!-- Features Tour -->
      <div tour="features" tourText="Check out this feature!" [tourPriority]="1">
        Feature 1
      </div>
      <div tour="features" tourText="And this one too!" [tourPriority]="2">
        Feature 2
      </div>
    </div>
  `,
})
export class MultiTourComponent {
  constructor(public tourService: TourService) {}
}
```

## Programmatic Tour Control

```typescript
@Component({
  selector: 'app-programmatic',
  template: `
    <div class="controls">
      <button (click)="tourService.start('manual-tour')">Start</button>
      <button (click)="tourService.next()">Next</button>
      <button (click)="tourService.previous()">Previous</button>
      <button (click)="tourService.end()">End</button>
    </div>

    <div tour="manual-tour" tourText="Step 1" [tourPriority]="1">Content 1</div>
    <div tour="manual-tour" tourText="Step 2" [tourPriority]="2">Content 2</div>
    <div tour="manual-tour" tourText="Step 3" [tourPriority]="3">Content 3</div>
  `,
})
export class ProgrammaticComponent {
  constructor(public tourService: TourService) {}
}
```

## Responsive Tour Example

```typescript
@Component({
  selector: 'app-responsive',
  template: `
    <div class="responsive-layout">
      <nav
        tour="responsive-tour"
        tourTitle="Mobile-Friendly Navigation"
        tourText="Our tours work perfectly on all screen sizes!"
        [tourPriority]="1"
        tourPosition="auto"
      >
        Navigation
      </nav>

      <section
        tour="responsive-tour"
        tourTitle="Adaptive Content"
        tourText="The tooltip automatically adjusts its position based on available space."
        [tourPriority]="2"
        tourPosition="auto"
      >
        Main Content
      </section>
    </div>
  `,
  styles: [`
    .responsive-layout {
      display: grid;
      gap: 20px;
    }
    
    @media (min-width: 768px) {
      .responsive-layout {
        grid-template-columns: 250px 1fr;
      }
    }
  `]
})
export class ResponsiveComponent {
  constructor(private tourService: TourService) {}

  ngOnInit() {
    // Auto-start tour on mobile devices
    if (window.innerWidth < 768) {
      setTimeout(() => {
        this.tourService.start('responsive-tour');
      }, 1000);
    }
  }
}
```
