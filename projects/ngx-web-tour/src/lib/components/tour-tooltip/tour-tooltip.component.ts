import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourStep } from '../../models/tour-step.model';

@Component({
  selector: 'ngx-tour-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tour-tooltip.component.html',
  styleUrls: ['./tour-tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TourTooltipComponent implements OnInit, OnDestroy {
  @Input() step!: TourStep;
  @Input() currentIndex = 0;
  @Input() totalSteps = 0;
  @Input() showProgress = true;
  @Input() allowClose = true;

  @Output() next = new EventEmitter<void>();
  @Output() prev = new EventEmitter<void>();
  @Output() done = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  @ViewChild('tooltip', { static: false }) tooltipEl!: ElementRef<HTMLElement>;

  position = { top: '0px', left: '0px' };
  arrowPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';
  isVisible = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.calculatePosition();
    setTimeout(() => {
      this.isVisible = true;
      this.cdr.markForCheck();
    }, 50);
  }

  ngOnDestroy(): void {
    this.isVisible = false;
  }

  get isFirstStep(): boolean {
    return this.currentIndex === 0;
  }

  get isLastStep(): boolean {
    return this.currentIndex === this.totalSteps - 1;
  }

  get progressPercentage(): number {
    return ((this.currentIndex + 1) / this.totalSteps) * 100;
  }

  onNext(): void {
    this.next.emit();
  }

  onPrev(): void {
    this.prev.emit();
  }

  onDone(): void {
    this.done.emit();
  }

  onClose(): void {
    this.close.emit();
  }

  private calculatePosition(): void {
    if (!this.step?.element) return;

    const targetRect = this.step.element.getBoundingClientRect();
    const tooltipWidth = 320;
    const tooltipHeight = 200;
    const offset = 20;

    const preferredPosition = this.step.position || 'auto';
    let position = preferredPosition;

    // Auto-detect best position
    if (position === 'auto') {
      const spaceTop = targetRect.top;
      const spaceBottom = window.innerHeight - targetRect.bottom;
      const spaceLeft = targetRect.left;
      const spaceRight = window.innerWidth - targetRect.right;

      if (spaceBottom >= tooltipHeight + offset) {
        position = 'bottom';
      } else if (spaceTop >= tooltipHeight + offset) {
        position = 'top';
      } else if (spaceRight >= tooltipWidth + offset) {
        position = 'right';
      } else if (spaceLeft >= tooltipWidth + offset) {
        position = 'left';
      } else {
        position = 'bottom';
      }
    }

    let top = 0;
    let left = 0;

    switch (position) {
      case 'bottom':
        top = targetRect.bottom + offset;
        left = targetRect.left + targetRect.width / 2 - tooltipWidth / 2;
        this.arrowPosition = 'top';
        break;
      case 'top':
        top = targetRect.top - tooltipHeight - offset;
        left = targetRect.left + targetRect.width / 2 - tooltipWidth / 2;
        this.arrowPosition = 'bottom';
        break;
      case 'right':
        top = targetRect.top + targetRect.height / 2 - tooltipHeight / 2;
        left = targetRect.right + offset;
        this.arrowPosition = 'left';
        break;
      case 'left':
        top = targetRect.top + targetRect.height / 2 - tooltipHeight / 2;
        left = targetRect.left - tooltipWidth - offset;
        this.arrowPosition = 'right';
        break;
    }

    // Keep tooltip within viewport
    const padding = 10;
    top = Math.max(padding, Math.min(top, window.innerHeight - tooltipHeight - padding));
    left = Math.max(padding, Math.min(left, window.innerWidth - tooltipWidth - padding));

    this.position = {
      top: `${top}px`,
      left: `${left}px`,
    };

    this.cdr.markForCheck();
  }
}
