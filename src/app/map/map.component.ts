import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as d3 from 'd3';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {

    @Input() heroData;

    heroSelect = new FormControl('batman');
    heroFilePath: any;

    minHero: number;
    maxHero: number;

    mapWidth = 750;
    mapHeight = 350;

    mapProjection: any;
    mapPath: any;
    mapSvg: any;
    mapZoom: any;
    z: any;
    tooltipDiv: any;

    constructor() { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        // D3 Projection
        this.mapProjection = d3.geoEquirectangular()
            .translate([this.mapWidth / 2, this.mapHeight / 2])
            .scale([100]);

        // Path
        this.mapPath = d3.geoPath()
            .projection(this.mapProjection);

        // SVG
        this.mapSvg = d3.select('#hero-sighting-svg')
            .attr('width', this.mapWidth)
            .attr('height', this.mapHeight);

        this.z = this.mapSvg.append('g');

        // Tooltip
        this.tooltipDiv = d3.select('body')
            .append('div')
            .attr('class', 'map-tooltip')
            .style('opacity', 0);

        // Zoom
        this.mapSvg.call(d3.zoom()
            .scaleExtent([1 / 2, 8])
            // .on("zoom", this.zoomed));
            .on('zoom', (d) => {
                return this.z.attr('transform', d3.event.transform)
            })
        );

        // Load map data
        d3.json('assets/world-countries.json').then((json) => {

            // Create states paths
            this.z.selectAll('path')
                .data(json.features)
                .enter()
                .append('path')
                .attr('d', this.mapPath)
                .style('stroke', '#fff')
                .style('stroke-width', '1')
                .style('fill', 'rgb(224,224,224)');

            // Map Hero circles
            this.drawHeroCircles();
        });
    }

    drawHeroCircles() {
        // get the hero file we need to open based on selection
        this.heroFilePath = this.getHeroFilePath();

        // clear out previously drawn circles
        this.z.selectAll('circle').remove();

        // draw circles
        d3.csv(this.heroFilePath).then((heroData) => {

            this.findMinAndMaxHero(heroData);

            this.z.selectAll('circle')
            .data(heroData)
            .enter()
            .append('circle')
            .attr('cx', (d) => {
                return this.mapProjection([d.lon, d.lat])[0];
            })
            .attr('cy', (d) => {
                return this.mapProjection([d.lon, d.lat])[1];
            })
            .attr('r', (d) => {
                return this.calculateRadius(d.metric);
            })
                .style('fill', 'rgb(233,30,99)')
                .style('opacity', 0.85)
            // show tooltip
            .on('mouseover', (d) => {
                this.tooltipDiv.transition()
                .duration(200)
                .style('opacity', .9);
                this.tooltipDiv.text(d.place + ' - ' + d.metric)
                .style('left', (d3.event.pageX) + 'px')
                .style('top', (d3.event.pageY - 28) + 'px');
            })
            .on('mouseout', (d) => {
                this.tooltipDiv.transition()
                .duration(500)
                .style('opacity', 0);
            });
        });
    }

    getHeroFilePath() {
        return 'assets/' + this.heroSelect.value + '.csv';
    }

    findMinAndMaxHero ( heroData: any) {
        // set min and max to first hero so we can compare
        this.minHero = +heroData[0].metric;
        this.maxHero = +heroData[0].metric;

        heroData.forEach((obj) => {
            // find max hero
            if (+obj.metric > this.maxHero) {
                this.maxHero = +obj.metric;
            }
            // find min hero
            if (+obj.metric < this.minHero) {
                this.minHero = +obj.metric;
            }
        });
    }

    calculateRadius( metric: number) {
        // normalize heros
        return (((metric - this.minHero) / (this.maxHero - this.minHero)) + 1) * 5
    }

}
