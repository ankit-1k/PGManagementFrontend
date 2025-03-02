import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingrentsComponent } from './upcomingrents.component';

describe('UpcomingrentsComponent', () => {
  let component: UpcomingrentsComponent;
  let fixture: ComponentFixture<UpcomingrentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcomingrentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpcomingrentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
