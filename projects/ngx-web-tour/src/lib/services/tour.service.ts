import { Injectable, ComponentRef, ApplicationRef, createComponent, EnvironmentInjector } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TourStep, TourConfig, TourState } from '../models/tour-step.model';
import { TourTooltipComponent } from '../components/tour-tooltip/tour-tooltip.component';
import { TourBackdropComponent } from '../components/tour-backdrop/tour-backdrop.component';
import { TourI18nService } from './tour-i18n.service';

@Injectable({ providedIn: 'root' })
export class TourService {
  private tours = new Map<string, TourStep[]>();
  private currentSteps: TourStep[] = [];
  private currentIndex = 0;
  private currentTourName: string | null = null;

  private tooltipRef: ComponentRef<TourTooltipComponent> | null = null;
  private backdropRef: ComponentRef<TourBackdropComponent> | null = null;

  private stateSubject = new BehaviorSubject<TourState>({
    isActive: false,
    currentStep: 0,
    totalSteps: 0,
    tourName: null,
  });

  public state$: Observable<TourState> = this.stateSubject.asObservable();

  private defaultConfig: TourConfig = {
    backdrop: true,
    backdropColor: 'rgba(0, 0, 0, 0.7)',
    closeOnBackdropClick: true,
    showProgress: true,
    allowClose: true,
    nextBtnText: undefined,
    prevBtnText: undefined,
    doneBtnText: undefined,
    skipBtnText: undefined,
    animationDuration: 300,
    useI18n: true,
  };

  private config: TourConfig = { ...this.defaultConfig };

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector,
    private i18nService: TourI18nService
  ) {}

  register(name: string, step: TourStep): void {
    if (!this.tours.has(name)) {
      this.tours.set(name, []);
    }
    this.tours.get(name)!.push(step);
  }

  unregister(name: string, stepId: string): void {
    const steps = this.tours.get(name);
    if (steps) {
      const index = steps.findIndex((s) => s.id === stepId);
      if (index !== -1) {
        steps.splice(index, 1);
      }
    }
  }

  configure(config: Partial<TourConfig>): void {
    this.config = { ...this.defaultConfig, ...config };
  }

  start(name: string, config?: Partial<TourConfig>): void {
    if (config) {
      this.configure(config);
    }

    if (this.config.language) {
      this.i18nService.setLanguage(this.config.language);
    }

    const steps = this.tours.get(name);
    if (!steps || !steps.length) {
      console.warn(`Tour "${name}" not found or has no steps`);
      return;
    }

    this.currentSteps = [...steps].sort((a, b) => a.priority - b.priority);
    this.currentIndex = 0;
    this.currentTourName = name;

    this.updateState();
    this.showStep();
  }

  next(): void {
    if (this.currentIndex < this.currentSteps.length - 1) {
      this.currentIndex++;
      this.updateState();
      this.showStep();
    }
  }

  previous(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateState();
      this.showStep();
    }
  }

  end(): void {
    this.cleanup();
    this.currentSteps = [];
    this.currentIndex = 0;
    this.currentTourName = null;
    this.updateState();
  }

  private showStep(): void {
    const step = this.currentSteps[this.currentIndex];
    if (!step) return;

    this.cleanup();

    if (this.config.backdrop) {
      this.createBackdrop(step.element);
    }

    step.element.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });

    setTimeout(() => {
      this.createTooltip(step);
    }, this.config.animationDuration || 300);
  }

  private createBackdrop(targetElement: HTMLElement): void {
    const backdropComponent = createComponent(TourBackdropComponent, {
      environmentInjector: this.injector,
    });

    backdropComponent.setInput('targetElement', targetElement);
    backdropComponent.setInput('color', this.config.backdropColor);
    backdropComponent.instance.backdropClick.subscribe(() => {
      if (this.config.closeOnBackdropClick) {
        this.end();
      }
    });

    this.appRef.attachView(backdropComponent.hostView);
    const domElem = backdropComponent.location.nativeElement as HTMLElement;
    document.body.appendChild(domElem);

    this.backdropRef = backdropComponent;
  }

  private createTooltip(step: TourStep): void {
    const tooltipComponent = createComponent(TourTooltipComponent, {
      environmentInjector: this.injector,
    });

    const useI18n = this.config.useI18n !== false;
    const nextBtnText = step.nextBtnText || this.config.nextBtnText || (useI18n ? this.i18nService.translate('nextBtn') : 'Next');
    const prevBtnText = step.prevBtnText || this.config.prevBtnText || (useI18n ? this.i18nService.translate('prevBtn') : 'Previous');
    const doneBtnText = step.doneBtnText || this.config.doneBtnText || (useI18n ? this.i18nService.translate('doneBtn') : 'Done');

    const stepWithTranslations = {
      ...step,
      nextBtnText,
      prevBtnText,
      doneBtnText,
    };

    tooltipComponent.setInput('step', stepWithTranslations);
    tooltipComponent.setInput('currentIndex', this.currentIndex);
    tooltipComponent.setInput('totalSteps', this.currentSteps.length);
    tooltipComponent.setInput('showProgress', this.config.showProgress ?? step.showProgress ?? true);
    tooltipComponent.setInput('allowClose', this.config.allowClose ?? step.allowClose ?? true);

    tooltipComponent.instance.next.subscribe(() => this.next());
    tooltipComponent.instance.prev.subscribe(() => this.previous());
    tooltipComponent.instance.done.subscribe(() => this.end());
    tooltipComponent.instance.close.subscribe(() => this.end());

    this.appRef.attachView(tooltipComponent.hostView);
    const domElem = tooltipComponent.location.nativeElement as HTMLElement;
    document.body.appendChild(domElem);

    this.tooltipRef = tooltipComponent;
  }

  private cleanup(): void {
    if (this.tooltipRef) {
      this.appRef.detachView(this.tooltipRef.hostView);
      this.tooltipRef.destroy();
      this.tooltipRef = null;
    }

    if (this.backdropRef) {
      this.appRef.detachView(this.backdropRef.hostView);
      this.backdropRef.destroy();
      this.backdropRef = null;
    }
  }

  private updateState(): void {
    this.stateSubject.next({
      isActive: this.currentSteps.length > 0 && this.currentIndex >= 0,
      currentStep: this.currentIndex,
      totalSteps: this.currentSteps.length,
      tourName: this.currentTourName,
    });
  }

  getTourSteps(name: string): TourStep[] {
    return this.tours.get(name) || [];
  }

  hasTour(name: string): boolean {
    return this.tours.has(name) && this.tours.get(name)!.length > 0;
  }
}
