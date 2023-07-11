import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js/auto';
import 'chartjs-plugin-datalabels';

Chart.register(...registerables);

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements AfterViewInit {
  @ViewChild('myChart') myChart!: ElementRef;
  @ViewChild('earningsChart') earningsChart!: ElementRef;
  @ViewChild('salesChart') salesChart!: ElementRef;
  @ViewChild('rentChart') rentChart!: ElementRef;
  chartOptions: any;
  chartData: any;
  earningsChartData: any;
  salesChartData: any;
  rentChartData: any;
  chart: Chart<'pie'>;
  earningsChartInstance: Chart<'bar'>;
  salesChartInstance: Chart<'line'>;
  rentChartInstance: Chart<'doughnut'>;
  selectedEarningsPeriod: string;

  constructor() {
    this.selectedEarningsPeriod = 'monthly';
  }

  ngAfterViewInit() {
    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'right'
        },
        datalabels: {
          color: '#fff',
          font: {
            weight: 'bold'
          }
        }
      }
    };

    this.chartData = {
      labels: ['Taguig', 'Makati', 'Pasig', 'Manila City', 'Laguna', 'Rizal', 'Batangas'],
      datasets: [
        {
          label: 'Inquiries',
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(255, 205, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(201, 203, 207, 0.6)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 205, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(201, 203, 207, 1)'
          ],
          borderWidth: 1
        }
      ]
    };

    this.earningsChartData = {
      datasets: [
        {
          label: 'Estimated Earnings',
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(255, 205, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 205, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1
        }
      ]
    };

    this.salesChartData = {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Property Sales',
          data: [10, 20, 15, 30],
          backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 205, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(255, 205, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
          ],
          borderWidth: 1,
          fill: false
        }
      ]
    };

    this.rentChartData = {
      datasets: [
        {
          label: 'Estimated Earnings',
          data: [5000, 60000],
          backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 205, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(201, 203, 207, 0.6)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(201, 203, 207, 1)'
        ],
          borderWidth: 1
        }
      ]
    };

    const ctx = this.myChart.nativeElement.getContext('2d');
    this.chart = new Chart<'pie'>(ctx, {
      type: 'pie',
      data: this.chartData,
      options: this.chartOptions
    });


    const earningsCtx = this.earningsChart.nativeElement.getContext('2d');
    this.earningsChartInstance = new Chart<'bar'>(earningsCtx, {
      type: 'bar',
      data: this.earningsChartData,
      options: this.chartOptions
    });
    this.updateSaleEarningsChart();


    const salesCtx = this.salesChart.nativeElement.getContext('2d');
    this.salesChartInstance = new Chart<'line'>(salesCtx, {
      type: 'line',
      data: this.salesChartData,
      options: this.chartOptions
    });
    this.updateSalesChart();


    const rentCtx = this.rentChart.nativeElement.getContext('2d');
    this.rentChartInstance = new Chart<'doughnut'>(rentCtx, {
      type: 'doughnut',
      data: this.rentChartData,
      options: this.chartOptions
    });
    this.updateRentEarningsChart();
  }




  updateSaleEarningsChart() {
    this.earningsChartData.labels = ['2019', '2020', '2021', '2022', '2023'];
    this.earningsChartData.datasets[0].data = [50000, 60000, 70000, 80000, 90000];

    if (this.earningsChartInstance) {
      this.earningsChartInstance.update();
    }
  }


  updateRentEarningsChart() {
    if (this.selectedEarningsPeriod === 'monthly') {
      this.rentChartData.labels = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'
      ];
      this.rentChartData.datasets[0].data = [
        1000, 2000, 3000, 4000, 5000, 6000, 7000,
        8000, 9000, 10000, 11000, 12000
      ];
    } else {
      this.rentChartData.labels = ['2017', '2018', '2019', '2020', '2021', '2022', '2023'];
      this.rentChartData.datasets[0].data = [
        50000, 60000, 70000, 80000, 90000, 100000, 110000
      ];
    }

    if (this.rentChartInstance) {
      this.rentChartInstance.data = this.rentChartData;
      this.rentChartInstance.update();
    }
  }
  toggleRentEarningsPeriod() {
    this.selectedEarningsPeriod = this.selectedEarningsPeriod === 'monthly' ? 'yearly' : 'monthly';
    this.updateRentEarningsChart();
  }



  updateSalesChart() {
    this.salesChartData.labels = ['Q1', 'Q2', 'Q3', 'Q4'];
    this.salesChartData.datasets[0].data = [10, 20, 15, 30];

    if (this.salesChartInstance) {
      this.salesChartInstance.update();
    }
  }
}
