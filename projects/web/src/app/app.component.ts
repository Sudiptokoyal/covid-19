import {
    Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy
} from '@angular/core';

import { Map, NavigationControl } from 'mapbox-gl';

import { MapService } from './services/map.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('mapEl', { static: true })
    public mapEl: ElementRef<HTMLDivElement>;

    private map: Map;

    public data: any;
    public position: any = {lat: 20.5937, lng: 78.9629};
    constructor(
        private mapSvc: MapService,
    ) { }

    public ngOnInit(): void {
        this.getLatAndLong();
    }

    public ngAfterViewInit(): void {
        this.map = new Map({
            container: this.mapEl.nativeElement,
            style: 'mapbox://styles/mapbox/dark-v9',
            center: this.position,
            zoom: 4,
            pitch: 0,
            attributionControl: false
        });
        this.map.addControl(
            new NavigationControl({
                showZoom: true,
                showCompass: true
            }),
            'bottom-right'
        );
        this.mapSvc.map.next(this.map);
        this.map.on('load', () => {
            console.log('map loaded');
            this.mapSvc.map.complete();
        });
    }

    public ngOnDestroy(): void {
        if (this.map) {
            this.map.remove();
        }
    }


    // get latitude ang longitude
    getLatAndLong() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.position = { lat: position.coords.latitude, lng: position.coords.longitude };
            });
        } else {
            alert("Location is required");
        }
    };

}
