import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessegeBoxComponent } from './messege-box.component';

describe('MessegeBoxComponent', () => {
  let component: MessegeBoxComponent;
  let fixture: ComponentFixture<MessegeBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessegeBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessegeBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
