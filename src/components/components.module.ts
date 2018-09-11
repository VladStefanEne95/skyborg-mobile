import { NgModule } from '@angular/core';
import { ChartComponent } from './chart/chart';
import { StatsCardComponent } from './stats-card/stats-card';
import { BreakdownComponent } from './breakdown/breakdown';
import { DateFilterComponent } from './date-filter/date-filter';
import { SelectMarketplaceComponent } from './select-marketplace/select-marketplace';
@NgModule({
	declarations: [ChartComponent,
    StatsCardComponent,
    BreakdownComponent,
    DateFilterComponent,
    SelectMarketplaceComponent],
	imports: [],
	exports: [ChartComponent,
    StatsCardComponent,
    BreakdownComponent,
    DateFilterComponent,
    SelectMarketplaceComponent]
})
export class ComponentsModule {}
