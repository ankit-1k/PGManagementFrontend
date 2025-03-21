import { Component, OnInit } from '@angular/core';
import { SuperadminService } from 'src/app/services/superadmin/superadmin.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  allReportList: any[] = [];
  filteredReport: any[] = [];
  totalEarnings: number = 0;
  selectedYear: number = new Date().getFullYear(); // Default to current year
  chartData: any;
  chartOptions: any;

  // ✅ Year Options for PrimeNG Dropdown
  yearOptions = [
    { label: '2023', value: 2023 },
    { label: '2024', value: 2024 },
    { label: '2025', value: 2025 }
  ];

  constructor(private reportService: SuperadminService) { }

  ngOnInit(): void {
    this.getReportsDataList();
  }

  getReportsDataList() {
    this.reportService.getReportsDataList().subscribe({
      next: response => {
        this.allReportList = response.data;
        this.filterDataByYear(this.selectedYear);
      },
      error: error => {
        console.error(error);
      }
    });
  }

  filterDataByYear(year: number) {
    this.selectedYear = year;
    this.filteredReport = this.allReportList.filter(report => {
      return new Date(report.dueDate).getFullYear() === year;
    });

    this.calculateEarnings();
  }

  calculateEarnings() {
    const monthlyEarnings = Array(12).fill(0);
    this.totalEarnings = 0;

    this.filteredReport.forEach(report => {
      const date = new Date(report.dueDate);
      const month = date.getMonth();

      monthlyEarnings[month] += report.amount;
      this.totalEarnings += report.amount;
    });

    this.updateChart(monthlyEarnings);
  }

  updateChart(monthlyEarnings: number[]) {
    this.chartData = {
      labels: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ],
      datasets: [
        {
          label: `Earnings for ${this.selectedYear}`,
          data: monthlyEarnings,
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2
        }
      ]
    };

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false
    };
  }
}
