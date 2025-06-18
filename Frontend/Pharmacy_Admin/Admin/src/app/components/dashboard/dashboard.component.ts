import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashBoardComponent implements OnInit {
  ngOnInit(): void {
    // localStorage.removeItem('token'); 
    // Load charts sau khi component init
    setTimeout(() => {
      this.initCharts();
    }, 100);
  }

  initCharts() {
    // Đơn hàng tháng này
    this.createSparklineChart(
      'spark1',
      [31, 40, 28, 51, 42, 39, 100, 31, 40, 28, 51],
      '#734CEA',
      'line'
    );

    // Doanh thu tháng này
    this.createSparklineChart(
      'spark2',
      [12, 14, 2, 47, 32, 44, 14, 55, 41, 69],
      '#34bfa3',
      'bar'
    );

    // Người dùng 
    this.createSparklineChart(
      'spark3',
      [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54],
      '#f4516c',
      'line'
    );

    // Tổng doanh thu
    this.createSparklineChart(
      'spark4',
      [15, 75, 47, 65, 14, 32, 19, 54, 44, 61],
      '#00c5dc',
      'bar'
    );
  }

  createSparklineChart(
    elementId: string,
    data: number[],
    color: string,
    type: string
  ) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100');

    if (type === 'line') {
      this.drawLineChart(svg, data, color);
    } else {
      this.drawBarChart(svg, data, color);
    }

    element.innerHTML = '';
    element.appendChild(svg);
  }

  drawLineChart(svg: SVGElement, data: number[], color: string) {
    const width = 555;
    const height = 100;
    const max = Math.max(...data);
    const step = width / (data.length - 1);

    let path = '';
    data.forEach((value, index) => {
      const x = index * step;
      const y = height - (value / max) * height;
      path += index === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
    });

    const pathElement = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );
    pathElement.setAttribute('d', path);
    pathElement.setAttribute('stroke', color);
    pathElement.setAttribute('stroke-width', '4');
    pathElement.setAttribute('fill', 'none');
    pathElement.setAttribute('stroke-linecap', 'round');

    svg.appendChild(pathElement);
  }

  drawBarChart(svg: SVGElement, data: number[], color: string) {
    const width = 555;
    const height = 100;
    const max = Math.max(...data);
    const barWidth = width / data.length - 5;

    data.forEach((value, index) => {
      const barHeight = (value / max) * height;
      const x = index * (barWidth + 5);
      const y = height - barHeight;

      const rect = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'rect'
      );
      rect.setAttribute('x', x.toString());
      rect.setAttribute('y', y.toString());
      rect.setAttribute('width', barWidth.toString());
      rect.setAttribute('height', barHeight.toString());
      rect.setAttribute('fill', color);
      rect.setAttribute('opacity', '0.85');

      svg.appendChild(rect);
    });
  }
}
