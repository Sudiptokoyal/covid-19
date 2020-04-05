import { Component, OnInit } from '@angular/core';

import { MapService } from '../services/map.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    constructor(private mapSvc: MapService) { }

    public ngOnInit(): void {
        this.mapSvc.map.subscribe(map => {
            map.flyTo({
                center: {lat: 20.5937, lng: 78.9629},
                zoom: 3,
                pitch: 0,
            });
        });
    }

}
