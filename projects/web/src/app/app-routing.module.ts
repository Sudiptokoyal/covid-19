import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { CovidComponent } from './covid-19/covid.component';

const routes: Routes = [
    { path: '', redirectTo: '/covid', pathMatch: 'full' },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'covid',
        component: CovidComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            useHash: true,
            enableTracing: false
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
