import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js/auto';
import 'chartjs-plugin-datalabels';

import { HttpClientService } from 'src/app/shared/http-client.service';

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
  chart: any;
  earningsChartInstance: any;
  salesChartInstance: any;
  rentChartInstance: any;
  selectedEarningsPeriod: string;
  rentMonthlyEarnings: number[] = [];
  rentYearlyEarnings: number[] = [];
  salesByQuarter: { [key: string]: number } = {};

  constructor(private http: HttpClient, private httpClientService: HttpClientService) {
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
      },
      scales: {
        x: {
          grid: {
            display: false
          }
        },
        y: {
          grid: {
            display: false
          }
        }
      }
    };

    this.fetchChartData();
  }

  async fetchChartData() {
    try {
      const properties = await this.httpClientService.getAllProperties();

      const inquiriesByCity: { [key: string]: number } = {};
      const earningsByCity: { [key: string]: number } = {};
      const rentMonthlyEarnings: number[] = [];
      const rentYearlyEarnings: number[] = [];
      const salesByQuarter: { [key: string]: number } = {};

      properties.forEach((property: any) => {
        const { city, saleType, price, sold:isSold, dateCreated:saleDate } = property;


        if (city && property.listingTitle) {
          inquiriesByCity[city] = inquiriesByCity[city] ? inquiriesByCity[city] + 1 : 1;
        }
        console.log("isSold: " + isSold)


        if (isSold) {
          const saleMonth = new Date(saleDate).getMonth() + 1;
          const quarter = Math.ceil(saleMonth / 3);
          const salesKey = `Q${quarter}`;
          salesByQuarter[salesKey] = salesByQuarter[salesKey]
            ? salesByQuarter[salesKey] + 1
            : 1;
        }
      
        if (saleType === 'sale' && isSold) {
          const currentYear = new Date().getFullYear();
          const saleYear = new Date(parseInt(saleDate) * 1000).getFullYear();
          console.log("CURRENT YEAR", currentYear);
          console.log("SALE YEAR", saleYear);
          if (saleYear === currentYear) {
            earningsByCity[city] = earningsByCity[city] ? earningsByCity[city] + price : price;
          }
        }


        if (saleType === 'rent' && isSold) {
          const monthlyEarnings = price;
          const yearlyEarnings = price * 12;
          rentMonthlyEarnings.push(monthlyEarnings);
          rentYearlyEarnings.push(yearlyEarnings);
        }

      });

      console.log('earningsByCity:', earningsByCity);
      console.log('rentMonthlyEarnings:', rentMonthlyEarnings);
      console.log('rentYearlyEarnings:', rentYearlyEarnings);
      console.log('salesByQuarter:', salesByQuarter);

      this.chartData = {
        labels: Object.keys(inquiriesByCity),
        datasets: [
          {
            label: 'Inquiries',
            data: Object.values(inquiriesByCity),
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
      this.createChart();

      this.earningsChartData = {
        labels: Object.keys(earningsByCity),
        datasets: [
          {
            label: 'Earnings',
            data: Object.values(earningsByCity),
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 205, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 205, 86, 1)',
              'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
          }
        ]
      };
      this.createEarningsChart();

      this.rentChartData = {
        labels: ['Monthly Earnings', 'Yearly Earnings'],
        datasets: [
          {
            label: 'Rent Earnings',
            data: [rentMonthlyEarnings.reduce((a, b) => a + b, 0), rentYearlyEarnings.reduce((a, b) => a + b, 0)],
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
      this.createRentChart();

      this.salesChartData = {
        labels: Object.keys(salesByQuarter),
        datasets: [
          {
            label: 'Sales',
            data: Object.values(salesByQuarter),
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 205, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 205, 86, 1)',
              'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
          }
        ]
      };
      this.createSalesChart();
    } catch (error) {
      console.log(error);
    }
  }

  createChart() {
    const ctx = this.myChart.nativeElement.getContext('2d');
    this.chart = new (Chart as any)(ctx, {
      type: 'pie',
      data: this.chartData,
      options: this.chartOptions
    });
  }

  createEarningsChart() {
    const earningsCtx = this.earningsChart.nativeElement.getContext('2d');
    this.earningsChartInstance = new (Chart as any)(earningsCtx, {
      type: 'bar',
      data: this.earningsChartData,
      options: this.chartOptions
    });
  }

  createSalesChart() {
    const salesCtx = this.salesChart.nativeElement.getContext('2d');
    this.salesChartInstance = new (Chart as any)(salesCtx, {
      type: 'bar',
      data: this.salesChartData,
      options: this.chartOptions
    });
  }

  createRentChart() {
    const rentCtx = this.rentChart.nativeElement.getContext('2d');
    this.rentChartInstance = new (Chart as any)(rentCtx, {
      type: 'doughnut',
      data: this.rentChartData,
      options: this.chartOptions
    });
  }

  updateRentEarningsChart() {
    if (this.selectedEarningsPeriod === 'monthly') {
      this.rentChartData.labels = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'
      ];
      this.rentChartData.datasets[0].data = this.rentMonthlyEarnings;
    } else {
      this.rentChartData.labels = ['2017', '2018', '2019', '2020', '2021', '2022', '2023'];
      this.rentChartData.datasets[0].data = this.rentYearlyEarnings;
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
}
