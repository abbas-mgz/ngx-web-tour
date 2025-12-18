import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxWebTourComponent } from './ngx-web-tour.component';

describe('NgxWebTourComponent', () => {
  let component: NgxWebTourComponent;
  let fixture: ComponentFixture<NgxWebTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxWebTourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxWebTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
