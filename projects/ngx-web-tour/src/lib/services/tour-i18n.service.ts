import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TourTranslations, TourLanguageConfig, DEFAULT_TRANSLATIONS } from '../models/tour-i18n.model';

@Injectable({ providedIn: 'root' })
export class TourI18nService {
  private currentLanguage = 'en';
  private customTranslations: TourLanguageConfig = {};
  private translations: TourLanguageConfig = { ...DEFAULT_TRANSLATIONS };

  private languageSubject = new BehaviorSubject<string>(this.currentLanguage);
  public language$: Observable<string> = this.languageSubject.asObservable();

  constructor() {
    // Try to detect browser language
    this.detectBrowserLanguage();
  }

  /**
   * Set the current language
   */
  setLanguage(languageCode: string): void {
    if (this.translations[languageCode]) {
      this.currentLanguage = languageCode;
      this.languageSubject.next(languageCode);
    } else {
      console.warn(`Language "${languageCode}" not found. Falling back to English.`);
      this.currentLanguage = 'en';
      this.languageSubject.next('en');
    }
  }

  /**
   * Get the current language code
   */
  getCurrentLanguage(): string {
    return this.currentLanguage;
  }

  /**
   * Get current language translations
   */
  getCurrentTranslations(): TourTranslations {
    return this.translations[this.currentLanguage] || this.translations['en'];
  }

  /**
   * Get a specific translation
   */
  translate(key: keyof TourTranslations): string {
    const translations = this.getCurrentTranslations();
    return translations[key] || DEFAULT_TRANSLATIONS['en'][key] || '';
  }

  /**
   * Get translated text with variable replacement
   */
  translateWithParams(key: keyof TourTranslations, params: { [key: string]: any }): string {
    let text = this.translate(key);
    
    Object.keys(params).forEach(paramKey => {
      text = text.replace(`{${paramKey}}`, params[paramKey]);
    });
    
    return text;
  }

  /**
   * Add or update custom translations for a language
   */
  addTranslations(languageCode: string, translations: TourTranslations): void {
    if (!this.translations[languageCode]) {
      this.translations[languageCode] = { ...DEFAULT_TRANSLATIONS['en'] };
    }
    
    this.translations[languageCode] = {
      ...this.translations[languageCode],
      ...translations,
    };
    
    this.customTranslations[languageCode] = translations;
  }

  /**
   * Add multiple language translations at once
   */
  addMultipleTranslations(translations: TourLanguageConfig): void {
    Object.keys(translations).forEach(lang => {
      this.addTranslations(lang, translations[lang]);
    });
  }

  /**
   * Get all available languages
   */
  getAvailableLanguages(): string[] {
    return Object.keys(this.translations);
  }

  /**
   * Check if a language is supported
   */
  isLanguageSupported(languageCode: string): boolean {
    return !!this.translations[languageCode];
  }

  /**
   * Reset to default translations
   */
  resetTranslations(): void {
    this.translations = { ...DEFAULT_TRANSLATIONS };
    this.customTranslations = {};
  }

  /**
   * Detect and set browser language
   */
  private detectBrowserLanguage(): void {
    if (typeof window !== 'undefined' && window.navigator) {
      const browserLang = window.navigator.language.split('-')[0]; // e.g., 'en-US' -> 'en'
      
      if (this.isLanguageSupported(browserLang)) {
        this.setLanguage(browserLang);
      }
    }
  }

  /**
   * Get RTL (Right-to-Left) status for current language
   */
  isRTL(): boolean {
    const rtlLanguages = ['ar', 'fa', 'he', 'ur'];
    return rtlLanguages.includes(this.currentLanguage);
  }
}
