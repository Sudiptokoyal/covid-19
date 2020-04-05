import {
    Component, ViewChild, AfterViewInit, OnInit, OnDestroy, ElementRef, NgZone
} from '@angular/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { HttpClient } from '@angular/common/http';
import { HexagonLayer, HeatmapLayer } from '@deck.gl/aggregation-layers';

import { Subscription } from 'rxjs';
import { Map } from 'mapbox-gl';

import { MapService } from '../services/map.service';
import { ApiService } from '../services/data.service';

declare var deck: any;

@Component({
    selector: 'app-covid',
    templateUrl: './covid.component.html',
    styleUrls: ['./covid.component.scss']
})
export class CovidComponent implements OnInit, OnDestroy {
    private animationFrame: number;

    constructor(
        private zone: NgZone,
        private http: HttpClient,
        private mapSvc: MapService,
        private _apiServ: ApiService
    ) { }

    public ngOnInit(): void {
        this.mapSvc.map.subscribe(map => {
            // map.flyTo({
            //     center: { lng: -74.0123409459859, lat: 40.704499769452724 },
            //     zoom: 4,
            //     pitch: 45,
            // });

            this._apiServ.get('locations')
                .subscribe(res => {
                    console.log(res);
                    // this.addScatterplot(map, res.locations);
                    this.addScatterplot(map, res.locations);
                    // this.addHeatMapPlot(map, res.locations);
                    // this.addHexagonPlot(map, res.locations);
                });
        });
    }

    public ngOnDestroy(): void {
        if (!!this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        this.mapSvc.map.subscribe(map => {
            map.removeLayer('buildings')
                .removeLayer('3d-buildings')
                .removeLayer('trips');
        });
    }

    private addScatterplot(map: Map, data: any[]): void {
        const scatterplot = new deck.MapboxLayer({
            id: 'scatter',
            type: deck.ScatterplotLayer,
            data: data,
            opacity: 0.8,
            filled: true,
            radiusMinPixels: 10,
            radiusMaxPixels: 50,
            getPosition: d => [parseInt(d.coordinates.longitude), parseInt(d.coordinates.latitude)],
            getFillColor: d => this.getColor(parseInt(d.latest.confirmed)),
            pickable: true,
            onHover: ({ object, x, y }) => {
                const el = document.getElementById('tooltip');
                if (object) {
                    const incident_id = object.latest.confirmed;
                    const deaths = object.latest.deaths;

                    el.innerHTML = `<p>Country: ${object.country}, Confirmed Cases: ${incident_id}, Deaths: ${deaths}, Recoverd: ${object.latest.recovered}</p>`;
                    el.style.display = 'block';
                    el.style.left = x + 'px';
                    el.style.top = y + 'px';
                    el.style.borderRadius = '5px';
                    el.style.backgroundColor = '#4cd3c2';
                    el.style.opacity = '0.8'
                } else {
                    el.style.display = 'none';
                    el.style.opacity = '0.0'
                }
            },
        });

        map.addLayer(scatterplot);
    }

    private addHeatMapPlot(map: Map, data: any[]): void {
        const heatMapPlot = new deck.MapboxLayer({
            id: 'heat',
            type: deck.HeatmapLayer,
            data: data,
            getPosition: d => [parseInt(d.coordinates.longitude), parseInt(d.coordinates.latitude)],
            getWeight: d => parseInt(d.latest.deaths) + (parseInt(d.latest.confirmed) * 0.5),
            radiusPixels: 60,
        });

        map.addLayer(heatMapPlot);
    }


    private addHexagonPlot(map: Map, data: any[]): void {
        const hexplot = new deck.MapboxLayer({
            id: 'hex',
            type: deck.HexagonLayer,
            data: data,
            getPosition: d => [parseInt(d.coordinates.longitude), parseInt(d.coordinates.latitude)],
            getElevationWeight: d => parseInt(d.latest.deaths) + parseInt(d.latest.confirmed),
            elevationScale: 100,
            extruded: true,
            radius: 1609,
            opacity: 0.6,
            coverage: 0.88,
            lowerPercentile: 50
        });

        map.addLayer(hexplot);
    }

    private getColor(noOfDeaths: number): any[] {
        if(noOfDeaths < 100) {
            return [255, 180, 0, 150];
        } else if(noOfDeaths < 500) {
            return [255, 150, 0, 150];
        } else if(noOfDeaths < 100) {
            return [255, 110, 0, 150];
        } else if(noOfDeaths < 5000) {
            return [255, 70, 0, 150];
        } else {
            return [255, 0, 0, 150];
        }
    }

}
