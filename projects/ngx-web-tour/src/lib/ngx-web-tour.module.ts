import { NgModule } from '@angular/core';
import { TourDirective } from './directives/tour.directive';
import { TourTooltipComponent } from './components/tour-tooltip/tour-tooltip.component';
import { TourBackdropComponent } from './components/tour-backdrop/tour-backdrop.component';

@NgModule({
  imports: [TourDirective, TourTooltipComponent, TourBackdropComponent],
  exports: [TourDirective, TourTooltipComponent, TourBackdropComponent],
})
export class NgxWebTourModule {}
