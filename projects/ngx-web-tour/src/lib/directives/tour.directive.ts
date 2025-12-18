import {
  Directive,
  Input,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { TourService } from '../services/tour.service';

@Directive({
  selector: '[tour]',
  standalone: true,
})
export class TourDirective implements AfterViewInit, OnDestroy {
  @Input() tour!: string;
  @Input() tourText!: string;
  @Input() tourTitle?: string;
  @Input() tourPriority = 0;
  @Input() tourPosition: 'top' | 'bottom' | 'left' | 'right' | 'auto' = 'auto';
  @Input() tourShowProgress?: boolean;
  @Input() tourAllowClose?: boolean;
  @Input() tourNextBtnText?: string;
  @Input() tourPrevBtnText?: string;
  @Input() tourDoneBtnText?: string;

  private stepId: string;

  constructor(
    private el: ElementRef<HTMLElement>,
    private tourService: TourService
  ) {
    this.stepId = crypto.randomUUID();
  }

  ngAfterViewInit(): void {
    this.tourService.register(this.tour, {
      id: this.stepId,
      element: this.el.nativeElement,
      title: this.tourTitle,
      text: this.tourText,
      priority: this.tourPriority,
      position: this.tourPosition,
      showProgress: this.tourShowProgress,
      allowClose: this.tourAllowClose,
      nextBtnText: this.tourNextBtnText,
      prevBtnText: this.tourPrevBtnText,
      doneBtnText: this.tourDoneBtnText,
    });
  }

  ngOnDestroy(): void {
    this.tourService.unregister(this.tour, this.stepId);
  }
}
