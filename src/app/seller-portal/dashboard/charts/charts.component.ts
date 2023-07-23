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
  earningsChartData: any = {};
  salesChartData: any;
  rentChartData: any;
  chart: any;
  earningsChartInstance: any;
  salesChartInstance: any;
  rentChartInstance: any;
  selectedEarningsPeriod: string;
  propertiesSoldByYear: { [key: string]: number } = {};
  inquiriesByCity: { [key: string]: number } = {};
  rentMonthlyEarnings: number[] = [];
  rentYearlyEarnings: number[] = [];
  rentLabels: any[] = [];
  totalEarnings: any[] = [];

  constructor(
    private http: HttpClient,
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
          position: 'bottom'
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
          },
          ticks: {
            autoSkip: true, 
            maxRotation: 0, 
            padding: 10,
            display: false
          }
        },
        y: {
          grid: {
            display: false
          },
          ticks: {
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

      const properties = await this.httpClientService.getAllProperties(currentUser.id);
      this.propertiesSoldByYear = {};

      properties.forEach((property: any) => {
        const { city, inquiries, price, sold: isSold, dateSold } = property;
        const rentMonthlyEarnings: number[] = [];
        const rentYearlyEarnings: number[] = [];

        if (city && property.listingTitle) {
          if (!this.inquiriesByCity[city]) {
            this.inquiriesByCity[city] = 0;
          }

          this.inquiriesByCity[city] += inquiries ? inquiries.length : 0;
        }

        if (isSold && dateSold) {
          const year = new Date(parseInt(dateSold)).getFullYear().toString();

          if (!this.propertiesSoldByYear[year]) {
            this.propertiesSoldByYear[year] = 0;
          }

          this.propertiesSoldByYear[year]++;
        }

        if (isSold && property.saleType === "For Sale") {
          const years = new Date(parseInt(dateSold)).getFullYear().toString();

          if (!this.earningsChartData[years]) {
            this.earningsChartData[years] = 0;
          }

          this.earningsChartData[years] += price;
        }
        
        if (property.saleType === 'For Rent' && isSold) {
          const monthlyEarnings = price;
          const yearlyEarnings = price * 12;
          this.rentLabels.push(property?.listingTitle)
          this.rentMonthlyEarnings.push(monthlyEarnings);
          rentYearlyEarnings.push(yearlyEarnings);
        }

      });

      const cities = Object.keys(this.inquiriesByCity);
      const inquiries = Object.values(this.inquiriesByCity);
      
      const yearsforProperty = Object.keys(this.propertiesSoldByYear);
      const propertyCounts = yearsforProperty.map((year: string) => {
        console.log("COUNT", this.propertiesSoldByYear[year])
        return this.propertiesSoldByYear[year]
      });
  
      const yearsForEarnings = Object.keys(this.earningsChartData);
      const earningsData = yearsForEarnings.map((year: string) => this.earningsChartData[year]);

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
      this.createChart();


      this.salesChartData = {
        labels: yearsforProperty,
        datasets: [
          {
            label: 'Properties Sold',
            data: propertyCounts,
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
      this.createSalesChart();

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
      this.createEarningsChart();

      this.rentChartData = {
        labels: this.rentLabels,
        datasets: [
          {
            label: 'Rent Earnings',
            data: this.rentMonthlyEarnings,
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

  createSalesChart() {
    const salesCtx = this.salesChart.nativeElement.getContext('2d');
    this.salesChartInstance = new Chart(salesCtx, {
      type: 'line',
      data: this.salesChartData,
      options: this.chartOptions
    });
  }

  createEarningsChart() {
    const earningsCtx = this.earningsChart.nativeElement.getContext('2d');
    this.earningsChartInstance = new Chart(earningsCtx, {
      type: 'bar',
      data: this.earningsChartData,
      options: {
        ...this.chartOptions,
        scales: {
          ...this.chartOptions.scales,
          x: {
            grid: {
              display: false
            },
            ticks: {
              autoSkip: true, 
              maxRotation: 0, 
              padding: 10,
              display: false
            }
          },
          y: {
            grid: {
              display: false
            },
            ticks: {
                display: true,
                startAtZero: true,
                callback: function(value: any, index: any, values: any) {
                    if(parseInt(value) >= 1000){
                        return '₱' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    } else {
                        return '₱' + value;
                    }
                }  
              // display: false
            }
          }
        }
        
      }
    });
  }

  createRentChart() {
    const rentCtx = this.rentChart.nativeElement.getContext('2d');
    this.rentChartInstance = new Chart(rentCtx, {
      type: 'doughnut',
      data: this.rentChartData,
      options: {...this.chartOptions}
    });
  }

  getRentalTotal(){
  return this.rentMonthlyEarnings.reduce((a, b) => a + b, 0)
  }



}
