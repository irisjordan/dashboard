import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
	selector: 'chart',
	templateUrl: './chart.component.html',
	styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

    @Input() data;
    @Input() chartType;
    @Input() chartData;
    @Input() chartLabels;
    @Input() chartTotal;
    chart = [];

    public totalFontSize;

    constructor(private elementRef: ElementRef) { }

    ngOnInit() {

        const htmlRef = this.elementRef.nativeElement.querySelector(`#chart-canvas`);

        switch (this.chartType.toLowerCase()) {
            case 'line':

            this.chart = new Chart(htmlRef, {
                type: 'line',
                data: {
                    labels: this.chartLabels,
                    datasets: [
                        {
                            data: this.chartData,
                            //borderColor: '#E91E63',
                            borderColor: '#1ea6bf',
                            fill: false
                        }
                    ]
                },
                options: {
                    legend: {
                        display: false
                    },
                    scales: {
                        xAxes: [{
                            display: true
                        }],
                        yAxes: [{
                            display: true
                        }],
                    }
                }
            });

            break;


            case 'bar':

            this.chart = new Chart(htmlRef, {
                type: 'bar',
                data: {
                    labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                    datasets: [
                        {
                            data: this.chartData,
                            //backgroundColor: '#ef4fa6',
                            backgroundColor: '#2cbdd8',
                            fill: false
                        }
                    ]
                },
                options: {
                    legend: {
                        display: false
                    },
                    scales: {
                        xAxes: [{
                            display: true
                        }],
                        yAxes: [{
                            display: true
                        }],
                    }
                }
            });

            break;


            case 'doughnut':

            // change font size of total
            if (this.chartTotal) {
                const tempString = this.chartTotal.toString();

                if (tempString.length > 7 && tempString.length <= 9) {
                    this.totalFontSize = 'medium';
                }

                if (tempString.length > 9) {
                        this.totalFontSize = 'small';
                }
            }

            this.chart = new Chart(htmlRef, {
                type: 'doughnut',
                data: {
                    labels: this.chartLabels,
                    datasets: [
                        {
                            data: this.chartData,
                            //backgroundColor: ['#E91E63', '#ef4fa6', '#f186c0', '#f5b6da']
                            backgroundColor: ['#1ea6bf', '#2cbdd8', '#45d0ea', '#66dff5']
                        }
                    ]
                },
                options: {
                    legend: {
                        display: false
                    },
                    cutoutPercentage: 75
                }
            });
            break;
        }
    }

}
