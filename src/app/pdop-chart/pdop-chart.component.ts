import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, ChartConfiguration, CategoryScale, LinearScale, LineController, PointElement, LineElement } from 'chart.js';

Chart.register(LineController, CategoryScale, LinearScale, PointElement, LineElement);

@Component({
  selector: 'app-pdop-chart',
  templateUrl: './pdop-chart.component.html',
  styleUrls: ['./pdop-chart.component.css']
})
export class PdopChartComponent implements OnInit {
  chart?: Chart;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('http://127.0.0.1:5000/api/pdop').subscribe((res: any) => {
      console.log(res);

      let pdop = res.pdop;
      let ex = res.ex;
      let ey = res.ey;

      console.log(pdop);
      console.log(ex);
      console.log(ey);

      const config: ChartConfiguration = {
        type: 'line',
        data: {
          labels: ex,
          datasets: [
            { 
              data: pdop,
              borderColor: "#3cba9f",
              fill: false
            }
          ]
        },
        options: {
          plugins: {
            legend: {
              display: false
            },
          },
          scales: {
            x: {
              display: true
            },
            y: {
              display: true
            },
          }
        }
      };

      this.chart = new Chart('canvas', config);
    });
  }
}
