export interface TourStep {
  id: string;
  element: HTMLElement;
  title?: string;
  text: string;
  priority: number;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
  showProgress?: boolean;
  allowClose?: boolean;
  nextBtnText?: string;
  prevBtnText?: string;
  doneBtnText?: string;
}

export interface TourConfig {
  backdrop?: boolean;
  backdropColor?: string;
  closeOnBackdropClick?: boolean;
  showProgress?: boolean;
  allowClose?: boolean;
  nextBtnText?: string;
  prevBtnText?: string;
  doneBtnText?: string;
  skipBtnText?: string;
  animationDuration?: number;
}

export interface TourState {
  isActive: boolean;
  currentStep: number;
  totalSteps: number;
  tourName: string | null;
}