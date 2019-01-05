import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'metric',
	templateUrl: './metric.component.html',
	styleUrls: ['./metric.component.scss']
})
export class MetricComponent implements OnInit {

	@Input() data;
    public metricFontSize;

    constructor() { }

    ngOnInit() {

		console.log(this.data);

        // change font size of total
        if (this.data.value) {
            let tempString = this.data.value.toString();
            let charLimit = 6;

            if (this.data.postFix !== undefined) {
                // if there is a postfix
                tempString = tempString + this.data.postFix;
                charLimit = 7;
            } else if (this.data.type === 'currency') {
                charLimit = 5;
            }

            if (tempString.length > charLimit && tempString.length <= charLimit + 2) {
                this.metricFontSize = 'medium';
            }

            if (tempString.length > charLimit + 2 && tempString.length <= charLimit + 4) {
                    this.metricFontSize = 'small';
            }

            if (tempString.length > charLimit + 4) {
                this.metricFontSize = 'xsmall';
            }
        }
    }
}
