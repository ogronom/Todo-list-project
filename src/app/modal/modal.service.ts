import {ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef} from '@angular/core';
import {ModalComponent} from "./modal.component";
import {Subject} from "rxjs";
import {Task} from "../task.interface";

export interface eventData {
  state: string;
  task: Task;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private componentRef!: ComponentRef<ModalComponent>;
  // private componentSubscriber!: Subject<string>;
  private componentSubscriber!: Subject<eventData>;
  constructor(private resolver: ComponentFactoryResolver) {}

  openDeleteConfirmationModal(entry: ViewContainerRef, taskTitle: string) {
    let factory = this.resolver.resolveComponentFactory(ModalComponent);
    this.componentRef = entry.createComponent(factory);
    this.componentRef.instance.title = "Warning";
    this.componentRef.instance.body = 'You are about to delete this task: "'+ taskTitle +'". Please confirm that you want to proceed.';
    this.componentRef.instance.confirm_message = "Delete";

    return this.openModal();
  }
  openNewTaskModal(entry: ViewContainerRef) {
    let factory = this.resolver.resolveComponentFactory(ModalComponent);
    this.componentRef = entry.createComponent(factory);
    this.componentRef.instance.taskEditMode = true;
    this.componentRef.instance.title = "Create new task";
    this.componentRef.instance.body = "";
    this.componentRef.instance.confirm_message = "Save";

    return this.openModal();
  }
  openEditTaskModal(entry: ViewContainerRef, task: Task) {
    let factory = this.resolver.resolveComponentFactory(ModalComponent);
    this.componentRef = entry.createComponent(factory);
    this.componentRef.instance.taskEditMode = true;
    this.componentRef.instance.task = task;
    this.componentRef.instance.title = "Edit task";
    this.componentRef.instance.body = "";
    this.componentRef.instance.confirm_message = "Save";

    return this.openModal();
  }
  openModal() {
    this.componentRef.instance.closeModalEvent.subscribe(() => this.closeModal());
    this.componentRef.instance.confirmEvent.subscribe((event) => this.confirm(event));
    this.componentSubscriber = new Subject<eventData>();
    return this.componentSubscriber.asObservable();
  }

  closeModal() {
    this.componentSubscriber.complete();
    this.componentRef.destroy();
  }

  confirm(event: eventData) {
    console.log("Event: "+ JSON.stringify(event));
    this.componentSubscriber.next(event);
    this.closeModal();
  }
}
