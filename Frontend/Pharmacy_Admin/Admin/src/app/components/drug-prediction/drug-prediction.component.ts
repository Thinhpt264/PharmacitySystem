import { Component } from '@angular/core';
import { PredictionService } from 'src/app/service/prediction.service';

@Component({
  selector: 'app-drug-prediction',
  templateUrl: './drug-prediction.component.html',
  styleUrls: ['./drug-prediction.component.css']
})
export class DrugPredictionComponent {
  symptoms: string = '';
  results: any[] = []; 
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(private predictionService: PredictionService) {}

  predictDrugs(): void {
    if (!this.symptoms.trim()) {
      this.errorMessage = 'Vui lòng nhập ít nhất một triệu chứng';
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;
    this.results = [];

    const symptomsArray = this.symptoms
      .split(',')
      .map(s => s.trim())
      .filter(s => s);

    this.predictionService.predictDrugs(symptomsArray).subscribe({
      next: (response) => {
        this.results = response?.suggested_drugs || [];
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại.';
        console.error('API Error:', err);
        this.isLoading = false;
      }
    });
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !this.isLoading) {
      this.predictDrugs();
    }
  }
}
