import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSharedComponent } from './list-shared.component';

describe('ListSharedComponent', () => {
  let component: ListSharedComponent;
  let fixture: ComponentFixture<ListSharedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSharedComponent]
    });
    fixture = TestBed.createComponent(ListSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
