import { NgModule } from '@angular/core';
import { ChartComponent } from './chart/chart';
import { StatsCardComponent } from './stats-card/stats-card';
import { BreakdownComponent } from './breakdown/breakdown';
@NgModule({
	declarations: [ChartComponent,
    StatsCardComponent,
    BreakdownComponent],
	imports: [],
	exports: [ChartComponent,
    StatsCardComponent,
    BreakdownComponent]
})
export class ComponentsModule {}
