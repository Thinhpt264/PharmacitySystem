import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUrlService } from './baseUrl.service';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {
  constructor(
    private httpClient: HttpClient,
    private baseUrlService: BaseUrlService
  ) {}

  predictDrugs(symptoms: string[]): Observable<any> {
    const apiUrl = this.baseUrlService.getBaseUrlPrediction() + 'predict';
    return this.httpClient.post(apiUrl, { symptoms });
  }
}
