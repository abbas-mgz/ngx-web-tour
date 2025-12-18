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
  language?: string; // Language code (e.g., 'en', 'fa', 'ar')
  useI18n?: boolean; // Use i18n service for translations (default: true)
}

export interface TourState {
  isActive: boolean;
  currentStep: number;
  totalSteps: number;
  tourName: string | null;
}