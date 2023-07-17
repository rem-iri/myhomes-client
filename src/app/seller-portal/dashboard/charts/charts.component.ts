import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js/auto';
import 'chartjs-plugin-datalabels';

import { HttpClientService } from 'src/app/shared/http-client.service';
import { AuthStateService } from 'src/app/shared/auth-state.service';

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
  rentMonthlyEarnings: { [key: string]: number } = {}; 
  rentYearlyEarnings: { [key: string]: number } = {}; 
  salesByQuarter: { [key: string]: number } = {};
  inquiriesByCity: { [key: string]: number } = {};
  properties: any[] = [];

  constructor(
    private httpClientService: HttpClientService,
    private authStateService: AuthStateService
  ) {
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
      const currentUser = this.authStateService.getCurrentUser();
      if (!currentUser) {
        return;
      }
  
      // const properties = await this.httpClientService.getAllProperties(currentUser.userId);
  
      // this.properties = properties;
  
      // properties.forEach((property: any) => {
      //   const { city, inquiries, saleType, price, isSold, dateSold } = property;
  
      //   if (city && property.listingTitle) {
      //     if (!this.inquiriesByCity[city]) {
      //       this.inquiriesByCity[city] = 0;
      //     }
  
      //     this.inquiriesByCity[city] += inquiries ? inquiries.length : 0;
      //   }
  
        // if (isSold) {
        //   const date = new Date(dateSold);
        //   const year = date.getFullYear().toString();
        //   const month = ('0' + (date.getMonth() + 1)).slice(-2);
  
        //   if (!this.salesByQuarter[year]) {
        //     this.salesByQuarter[year] = 0;
        //   }
  
          // this.salesByQuarter[year]++;
  
      //     // Compute earnings chart data for sold properties
      //     if (saleType === 'For Sale') {
      //       const yearForSale = new Date(dateSold).getFullYear().toString();
  
      //       if (!this.earningsChartData[yearForSale]) {
      //         this.earningsChartData[yearForSale] = 0;
      //       }
  
      //       this.earningsChartData[yearForSale] += price;
      //     }
      //   }
      // });
  
      const cities = Object.keys(this.inquiriesByCity);
      const inquiries = Object.values(this.inquiriesByCity);
  
      this.chartData = {
        labels: cities,
        datasets: [
          {
            label: 'Inquiries',
            data: inquiries,
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
  
      this.salesChartData = {
        labels: Object.keys(this.salesByQuarter),
        datasets: [
          {
            label: 'Sales',
            data: Object.values(this.salesByQuarter),
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
  
      const yearsForEarnings = Object.keys(this.earningsChartData);
      const earningsData = yearsForEarnings.map((year: string) => this.earningsChartData[year]);
  
      this.earningsChartData = {
        labels: yearsForEarnings,
        datasets: [
          {
            label: 'Earnings',
            data: earningsData,
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
      this.createSalesChart();
      this.createEarningsChart();
    } catch (error) {
      console.log(error);
    }
  }
  
  createChart() {
    const ctx = this.myChart.nativeElement.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'pie',
      data: this.chartData,
      options: this.chartOptions
    });
  }

  createEarningsChart() {
    const earningsCtx = this.earningsChart.nativeElement.getContext('2d');
    this.earningsChartInstance = new Chart(earningsCtx, {
      type: 'bar',
      data: this.earningsChartData,
      options: this.chartOptions
    });
  }

  createSalesChart() {
    const salesCtx = this.salesChart.nativeElement.getContext('2d');
    this.salesChartInstance = new Chart(salesCtx, {
      type: 'bar',
      data: this.salesChartData,
      options: this.chartOptions
    });
  }

  createRentChart() {
    const rentCtx = this.rentChart.nativeElement.getContext('2d');
    this.rentChartInstance = new Chart(rentCtx, {
      type: 'doughnut',
      data: this.rentChartData,
      options: this.chartOptions
    });
  }

  updateRentEarningsChart() {
    if (this.selectedEarningsPeriod === 'monthly') {
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const monthlyData = [];
      for (let i = 0; i < 12; i++) {
        const filteredProperties = this.properties.filter((property: any) => {
          const dateSold = new Date(property.dateSold);
          return dateSold.getMonth() === i;
        });
        const totalEarnings = filteredProperties.reduce((sum: number, property: any) => sum + property.rentalEarnings, 0);
        monthlyData.push(totalEarnings);
      }
      this.rentChartData.labels = months;
      this.rentChartData.datasets[0].data = monthlyData;
    } else {
      const years = ['2017', '2018', '2019', '2020', '2021', '2022', '2023'];
      const yearlyData = [];
      for (let i = 0; i < years.length; i++) {
        const filteredProperties = this.properties.filter((property: any) => {
          const dateSold = new Date(property.dateSold);
          return dateSold.getFullYear().toString() === years[i];
        });
        const totalEarnings = filteredProperties.reduce((sum: number, property: any) => sum + property.rentalEarnings, 0);
        yearlyData.push(totalEarnings);
      }
      this.rentChartData.labels = years;
      this.rentChartData.datasets[0].data = yearlyData;
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
