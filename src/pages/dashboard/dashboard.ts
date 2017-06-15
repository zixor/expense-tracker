import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';


import { ExpenseSqliteService } from '../../providers/expense.service.sqlite';
import { UtilitiesService } from '../../providers/utilities.service';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class Dashboard {

  @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  //@ViewChild('lineCanvas') lineCanvas;

  barChart: any;
  doughnutChart: any;
  //lineChart: any;
  private labels = [];
  private data = [];
  private borderColor = [];
  private backgroundColor = [];
  private colors = {};

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private expenseService: ExpenseSqliteService,
    private utilitiesService: UtilitiesService) {
    this.getColors();
  }

  getColors() {
    this.colors = this.utilitiesService.getAppColors();
  }


  initializeData() {

    this.expenseService.getExpensesGroupByCategory().then(response => {

      if (response) {
        response.forEach(report => {

          this.labels.push(report.category);         
          this.data.push(report.amount);
         
          this.borderColor.push(this.colors[report.color]);
          this.backgroundColor.push(this.colors[report.color]);

        });
        this.makeGraphics(this.labels, this.data, this.borderColor, this.backgroundColor);
      }

    });
  }

  ionViewDidLoad() {

    this.initializeData();

  }

  private makeGraphics(labels, data, borderColor, backgroundColor) {
    this.barChart = new Chart(this.barCanvas.nativeElement, {

      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Expenses By Category',
          data: data,
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }

    });

    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          label: 'Category',
          data: data,
          backgroundColor: backgroundColor,
          hoverBackgroundColor: borderColor
        }]
      }

    });

    /*
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
    
          type: 'line',
          data: {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
              {
                label: "My First dataset",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [65, 59, 80, 81, 56, 55, 40],
                spanGaps: false,
              }
            ]
          }
    
        });*/
  }

  showItem() {
    console.log("show in cloud");
  }

}
