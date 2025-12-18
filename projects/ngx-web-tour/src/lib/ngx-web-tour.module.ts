import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourDirective } from './directives/tour.directive';
import { TourTooltipComponent } from './components/tour-tooltip/tour-tooltip.component';
import { TourBackdropComponent } from './components/tour-backdrop/tour-backdrop.component';

@NgModule({
  declarations: [TourDirective, TourTooltipComponent, TourBackdropComponent],
  imports: [CommonModule],
  exports: [TourDirective, TourTooltipComponent, TourBackdropComponent],
})
export class NgxWebTourModule {}
