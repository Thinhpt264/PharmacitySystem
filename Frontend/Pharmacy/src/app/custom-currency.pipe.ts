import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrency',
})
export class CustomCurrencyPipe implements PipeTransform {
  transform(value: number): string {
    if (value === null || value === undefined) return '';
    // Chuyển số thành chuỗi với dấu chấm làm phân cách hàng nghìn
    const formattedValue = value
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${formattedValue} VNĐ`;
  }
}
