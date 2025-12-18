import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'ngx-tour-backdrop',
  templateUrl: './tour-backdrop.component.html',
  styleUrls: ['./tour-backdrop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TourBackdropComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() targetElement!: HTMLElement;
  @Input() color = 'rgba(0, 0, 0, 0.7)';
  @Input() padding = 8;

  @Output() backdropClick = new EventEmitter<void>();

  isVisible = false;
  highlightStyle = {
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  };

  private resizeObserver?: ResizeObserver;
  private mutationObserver?: MutationObserver;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.updateHighlightPosition();
    this.setupObservers();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.isVisible = true;
      this.cdr.markForCheck();
    }, 50);
  }

  ngOnDestroy(): void {
    this.cleanupObservers();
  }

  onBackdropClick(): void {
    this.backdropClick.emit();
  }

  private updateHighlightPosition(): void {
    if (!this.targetElement) return;

    const rect = this.targetElement.getBoundingClientRect();

    this.highlightStyle = {
      top: Math.max(0, rect.top - this.padding),
      left: Math.max(0, rect.left - this.padding),
      width: rect.width + this.padding * 2,
      height: rect.height + this.padding * 2,
    };

    this.cdr.markForCheck();
  }

  private setupObservers(): void {
    // Watch for element resize
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.updateHighlightPosition();
      });
      this.resizeObserver.observe(this.targetElement);
    }

    // Watch for DOM changes
    if (typeof MutationObserver !== 'undefined') {
      this.mutationObserver = new MutationObserver(() => {
        this.updateHighlightPosition();
      });
      this.mutationObserver.observe(document.body, {
        attributes: true,
        childList: true,
        subtree: true,
      });
    }

    // Watch for scroll and resize
    window.addEventListener('scroll', this.handleScroll, true);
    window.addEventListener('resize', this.handleResize);
  }

  private cleanupObservers(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }

    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }

    window.removeEventListener('scroll', this.handleScroll, true);
    window.removeEventListener('resize', this.handleResize);
  }

  private handleScroll = (): void => {
    this.updateHighlightPosition();
  };

  private handleResize = (): void => {
    this.updateHighlightPosition();
  };
}
