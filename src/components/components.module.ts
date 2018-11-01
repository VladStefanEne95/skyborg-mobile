import { NgModule } from '@angular/core';
import { ChartComponent } from './chart/chart';
import { StatsCardComponent } from './stats-card/stats-card';
import { BreakdownComponent } from './breakdown/breakdown';
import { DateFilterComponent } from './date-filter/date-filter';
import { SelectMarketplaceComponent } from './select-marketplace/select-marketplace';
import { SelectOrganizationComponent } from './select-organization/select-organization';
import { AddCardModalComponent } from './add-card-modal/add-card-modal';
@NgModule({
	declarations: [ChartComponent,
    StatsCardComponent,
    BreakdownComponent,
    DateFilterComponent,
    SelectMarketplaceComponent,
    SelectOrganizationComponent,
    AddCardModalComponent],
	imports: [],
	exports: [ChartComponent,
    StatsCardComponent,
    BreakdownComponent,
    DateFilterComponent,
    SelectMarketplaceComponent,
    SelectOrganizationComponent,
    AddCardModalComponent]
})
export class ComponentsModule {}
