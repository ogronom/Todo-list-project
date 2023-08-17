import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from "../task.interface";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {
  priority_list: string[] = ["high", "normal", "low"];
  status_list: string[] = ["new", "done"]; // ["new", "in_progress", "stuck", "done"];
  constructor() {}

  @Input() taskEditMode: boolean = false;
  @Input() task: Task = {
    id: -1,
    title: "",
    details: "",
    priority: this.priority_list[1],
    status: this.status_list[0],
    item_order: -1
  };
  @Input() title: string = '';
  @Input() body: string = '';
  @Input() confirm_message: string = 'Save';
  @Output() closeModalEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter();

  taskEditForm: NgForm | undefined;


  ngOnInit(): void {
    console.log('Modal init');
  }

  closeModal() {
    this.closeModalEvent.emit();
  }
  closeModalOnBackdropClick() {
    //Backdrop click wouldn't close modal in new task or task edit mode
    if ( !this.taskEditMode ) this.closeModalEvent.emit();
  }
  confirm() {
    if ( this.taskEditMode ) {
      $(".task-form-submit-btn").click();
    } else {
      this.confirmEvent.emit({state: "confirmed"});
    }
  }
  onSubmit( taskEditForm: NgForm ) {
    if ( taskEditForm.valid ) {
      this.confirmEvent.emit({state: "confirmed", task: this.task});
    }
  }

  ngOnDestroy(): void {
    console.log('Modal destroyed');
  }

}
