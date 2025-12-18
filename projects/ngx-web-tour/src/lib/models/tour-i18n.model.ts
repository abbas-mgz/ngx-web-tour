export interface TourTranslations {
  nextBtn?: string;
  prevBtn?: string;
  doneBtn?: string;
  skipBtn?: string;
  closeBtn?: string;
  stepIndicator?: string; // e.g., "Step {current} of {total}"
}

export interface TourLanguageConfig {
  [languageCode: string]: TourTranslations;
}

export const DEFAULT_TRANSLATIONS: TourLanguageConfig = {
  en: {
    nextBtn: 'Next',
    prevBtn: 'Previous',
    doneBtn: 'Done',
    skipBtn: 'Skip',
    closeBtn: 'Close',
    stepIndicator: '{current} / {total}',
  },
  fa: {
    nextBtn: 'بعدی',
    prevBtn: 'قبلی',
    doneBtn: 'پایان',
    skipBtn: 'رد شدن',
    closeBtn: 'بستن',
    stepIndicator: '{current} از {total}',
  },
  ar: {
    nextBtn: 'التالي',
    prevBtn: 'السابق',
    doneBtn: 'تم',
    skipBtn: 'تخطي',
    closeBtn: 'إغلاق',
    stepIndicator: '{current} من {total}',
  },
  es: {
    nextBtn: 'Siguiente',
    prevBtn: 'Anterior',
    doneBtn: 'Hecho',
    skipBtn: 'Saltar',
    closeBtn: 'Cerrar',
    stepIndicator: '{current} de {total}',
  },
  fr: {
    nextBtn: 'Suivant',
    prevBtn: 'Précédent',
    doneBtn: 'Terminé',
    skipBtn: 'Passer',
    closeBtn: 'Fermer',
    stepIndicator: '{current} sur {total}',
  },
  de: {
    nextBtn: 'Weiter',
    prevBtn: 'Zurück',
    doneBtn: 'Fertig',
    skipBtn: 'Überspringen',
    closeBtn: 'Schließen',
    stepIndicator: '{current} von {total}',
  },
  tr: {
    nextBtn: 'İleri',
    prevBtn: 'Geri',
    doneBtn: 'Tamamla',
    skipBtn: 'Atla',
    closeBtn: 'Kapat',
    stepIndicator: '{current} / {total}',
  },
  ru: {
    nextBtn: 'Далее',
    prevBtn: 'Назад',
    doneBtn: 'Готово',
    skipBtn: 'Пропустить',
    closeBtn: 'Закрыть',
    stepIndicator: '{current} из {total}',
  },
  zh: {
    nextBtn: '下一步',
    prevBtn: '上一步',
    doneBtn: '完成',
    skipBtn: '跳过',
    closeBtn: '关闭',
    stepIndicator: '{current} / {total}',
  },
  ja: {
    nextBtn: '次へ',
    prevBtn: '前へ',
    doneBtn: '完了',
    skipBtn: 'スキップ',
    closeBtn: '閉じる',
    stepIndicator: '{current} / {total}',
  },
  ko: {
    nextBtn: '다음',
    prevBtn: '이전',
    doneBtn: '완료',
    skipBtn: '건너뛰기',
    closeBtn: '닫기',
    stepIndicator: '{current} / {total}',
  },
  pt: {
    nextBtn: 'Próximo',
    prevBtn: 'Anterior',
    doneBtn: 'Concluído',
    skipBtn: 'Pular',
    closeBtn: 'Fechar',
    stepIndicator: '{current} de {total}',
  },
  it: {
    nextBtn: 'Avanti',
    prevBtn: 'Indietro',
    doneBtn: 'Fatto',
    skipBtn: 'Salta',
    closeBtn: 'Chiudi',
    stepIndicator: '{current} di {total}',
  },
};
