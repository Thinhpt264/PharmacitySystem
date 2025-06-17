import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<string>('vi');
  public currentLanguage$ = this.currentLanguageSubject.asObservable();

  constructor(private translate: TranslateService) {
    // Thiết lập ngôn ngữ mặc định
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'vi';
    this.setLanguage(savedLanguage);
  }

  setLanguage(language: string): void {
    this.translate.use(language);
    this.currentLanguageSubject.next(language);
    localStorage.setItem('selectedLanguage', language);
  }

  getCurrentLanguage(): string {
    return this.currentLanguageSubject.value;
  }

  switchLanguage(): void {
    const currentLang = this.getCurrentLanguage();
    const newLang = currentLang === 'vi' ? 'en' : 'vi';
    this.setLanguage(newLang);
  }

  getLanguageLabel(lang: string): string {
    return lang === 'vi' ? 'Tiếng Việt' : 'English';
  }

  getOtherLanguage(): string {
    return this.getCurrentLanguage() === 'vi' ? 'en' : 'vi';
  }

  // Method để translate text
  translateText(key: string): string {
    return this.translate.instant(key);
  }
}
