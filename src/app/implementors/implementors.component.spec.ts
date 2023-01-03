import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImplementorsComponent } from './implementors.component';

describe('ImplementorsComponent', () => {
  let component: ImplementorsComponent;
  let fixture: ComponentFixture<ImplementorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImplementorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImplementorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
