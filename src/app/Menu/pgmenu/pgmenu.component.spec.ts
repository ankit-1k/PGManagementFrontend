import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgmenuComponent } from './pgmenu.component';

describe('PgmenuComponent', () => {
  let component: PgmenuComponent;
  let fixture: ComponentFixture<PgmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgmenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
