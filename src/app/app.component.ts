import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // Impressions
  public chartData1: any;
  public labels1: any;
  public details1: any;
  public total1: any;

  public chartData2: any;
  public labels2: any;
  public details2: any;

  public chartData3: any;
  public labels3: any;
  public details3: any;

  public sightingsData: any;
  
  public metric1: any;
  public metric2: any;
  public metric3: any;
  public metric4: any;
  
  ngOnInit() {
    this.chartData1 = [124127, 99152, 40233, 30871];
    this.labels1 = ["Item 1", "Item 2", "Item 3", "Item 4"];
    this.details1 = [
      {name: "Item 1", metric: 184127},
      {name: "Item 2", metric: 99152},
      {name: "Item 3", metric: 40233},
      {name: "Item 4", metric: 30871}
    ];
    this.total1 = 11294042;

    this.chartData2 = [14456, 19382, 8983, 12864];
    this.labels2 = ["Jan 19", "Feb 19", "Mar 19", "Apr 19"];
    this.details2 = [
      {name: "January 2019", metric: 14456},
      {name: "February 2019", metric: 19382},
      {name: "March 2019", metric: 8983},
      {name: "April 2019", metric: 12864}
    ];

    this.chartData3 = [4563, 6217, 980, 1432, 5923, 9216, 3021];
    this.labels3 = ["Item 1", "Item 2", "Item 3", "Item 4"];
    this.details3 = [
      {name: "Item 1", metric: 14456},
      {name: "Item 2", metric: 19382},
      {name: "Item 3", metric: 8983},
      {name: "Item 4", metric: 12864}
    ];

    this.sightingsData = {
      batman: [
          'Tucson',
          'San Francisco',
          'Santa Barbara',
          'New York City',
          'Washington DC'
      ],
      wonderwoman: [
          'Munich',
          'Rome',
          'Paris',
          'Madrid',
          'Prague'
      ],
      thor: [
          'Munich',
          'Johannesburg',
          'New York City',
          'Moscow',
          'Beijing'
      ],
      wolverine: [
          'Paris',
          'Santa Barbara',
          'New York City',
          'Prague',
          'Beijing'
      ]
    };

    this.metric1 = [];
    this.metric2 = [];
    this.metric3 = [];
    this.metric4 = [];
    

    this.metric1.value = 45;
    this.metric1.type = 'percent';
    this.metric1.status = 'positive';

    this.metric2.value = 163;
    this.metric2.type = 'currency';
    this.metric2.status = 'negative';

    this.metric3.value = 59;
   
    this.metric4.value = 1034;
    this.metric4.type = 'currency';
    this.metric4.status = 'negative';


    console.log(this.metric1);

  }
}
