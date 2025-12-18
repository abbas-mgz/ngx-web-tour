import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourDirective, TourService } from 'ngx-web-tour';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TourDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'NgxWebTour Demo';
  
  codeExample = `// Add directive to elements
<button
  tour="my-tour"
  tourTitle="Welcome"
  tourText="Click here!"
  [tourPriority]="1"
>
  Start
</button>

// Start the tour
constructor(private tourService: TourService) {}
this.tourService.start('my-tour');`;
  
  tourState = {
    isActive: false,
    currentStep: 0,
    totalSteps: 0,
    tourName: null as string | null,
  };

  private destroy$ = new Subject<void>();

  constructor(public tourService: TourService) {}

  ngOnInit(): void {
    // Subscribe to tour state
    this.tourService.state$
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => {
        this.tourState = state;
      });

    // Configure tour
    this.tourService.configure({
      backdrop: true,
      backdropColor: 'rgba(0, 0, 0, 0.7)',
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

  startWelcomeTour(): void {
    this.tourService.start('welcome-tour');
  }

  startFeaturesTour(): void {
    this.tourService.start('features-tour');
  }

  endTour(): void {
    this.tourService.end();
  }
}
