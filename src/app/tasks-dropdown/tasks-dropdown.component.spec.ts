import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksDropdownComponent } from './tasks-dropdown.component';

describe('TasksDropdownComponent', () => {
  let component: TasksDropdownComponent;
  let fixture: ComponentFixture<TasksDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TasksDropdownComponent]
    });
    fixture = TestBed.createComponent(TasksDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
