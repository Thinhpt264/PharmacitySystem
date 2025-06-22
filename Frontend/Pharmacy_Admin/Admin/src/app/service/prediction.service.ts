// src/app/services/prediction.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { BaseUrlService } from './baseUrl.service';

@Injectable()
export class PredictionService {
  constructor(
    private httpClient: HttpClient,
    private baseUrlPrediction: BaseUrlService
  ) {}

  async predictDrugs(symptoms: string[]): Promise<any> {
  const apiUrl = this.baseUrlPrediction.getBaseUrlPrediction() + 'predict';
  console.log('API URL:', apiUrl);
  
  try {
    const response = await lastValueFrom(
      this.httpClient.post(apiUrl, { symptoms })
    );
    console.log('API Response:', response);
    return response;
  } catch (error) {
    console.error('API Error Details:', {
      url: apiUrl,
      error: error,
      
    });
    throw error;
  }
}
async translateText(text: string): Promise<string> {
  interface TranslationResponse {
    translatedText?: string;
    [key: string]: any;
  }
  const response = await lastValueFrom(
    this.httpClient.post<TranslationResponse>('https://translation-api.com/translate', {
      text,
      source: 'en',
      target: 'vi'
    })
  );
  return response.translatedText || text;
}
}