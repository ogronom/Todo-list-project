import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import {NgFor, NgIf} from '@angular/common';
import { Task } from "../task.interface";

@Component({
  selector: 'app-tasks-dropdown',
  templateUrl: './tasks-dropdown.component.html',
  styleUrls: ['./tasks-dropdown.component.css'],
  standalone: true,
  imports: [CdkDropList, NgFor, CdkDrag, NgIf]
})
export class TasksDropdownComponent {
  @Input() tasks: Task[] = [];
  @Output() orderChanged = new EventEmitter();
  @Output() editTaskClick = new EventEmitter();
  @Output() deleteTaskClick = new EventEmitter();
  @Output() changeTaskStatusClick = new EventEmitter();

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
    if ( event.previousIndex !== event.currentIndex ) {
      this.orderChanged.emit();
    }
  }
  onEditTaskClick(task: Task) {
    this.editTaskClick.emit(task);
  }
  onDeleteTaskClick(task: Task) {
    this.deleteTaskClick.emit(task);
  }
  onTaskClick(task: Task) {
    if ( task.status === "done" ) {
      task.status = "new";
    } else {
      task.status = "done"
    }
    this.changeTaskStatusClick.emit(task);
  }
}
