// src/app/components/drug-prediction/drug-prediction.component.ts
import { Component } from '@angular/core';
import { PredictionService } from 'src/app/service/prediction.service';

@Component({
  selector: 'app-drug-prediction',
  templateUrl: './drug-prediction.component.html',
  styleUrls: ['./drug-prediction.component.css']
})
export class DrugPredictionComponent {
  symptoms: string = '';
  suggestedDrugs: any[] = [];
  isLoading: boolean = false;
  error: string | null = null;

  constructor(private predictionService: PredictionService) { }

  async predictDrugs() {
    if (!this.symptoms.trim()) {
      this.error = 'Vui lòng nhập ít nhất một triệu chứng';
      return;
    }

    this.isLoading = true;
    this.error = null;
    const symptomsArray = this.symptoms.split(',').map(s => s.trim());

    try {
      const response = await this.predictionService.predictDrugs(symptomsArray);
      this.suggestedDrugs = response.suggested_drugs || [];
    } catch (error) {
      this.error = 'Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại.';
      console.error('API Error:', error);
    } finally {
      this.isLoading = false;
    }
  }
}