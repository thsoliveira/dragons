import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragonManageComponent } from './dragon-manage.component';

describe('DragonManageComponent', () => {
  let component: DragonManageComponent;
  let fixture: ComponentFixture<DragonManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragonManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragonManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
