import { Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Task } from "./task.interface";
import { DataService } from "./data-service.service"
import { ModalService } from "./modal/modal.service";
import { Subscription } from "rxjs";

enum MessageType {
  Info = "info",
  Warning = "warning",
  Error = "error"
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  sub: any;
  orderChanged: boolean = false;
  changeOrderCheck: any;
  haveMessageToDisplay: boolean = false;
  infoBubbleType: MessageType = MessageType.Info;
  infoBubbleMessage: string = "";
  infoBubbleDisplayTime: number = 3000;

  constructor(private dataService: DataService, private modalService: ModalService) {
  }
  @ViewChild('modal', { read: ViewContainerRef })
  entry!: ViewContainerRef;
  modalSub!: Subscription;

  ngOnInit(): void {
    this.getAllTasksFromServer();
    this.changeOrderCheck = setInterval(() => {
      if ( this.orderChanged ) {
        this.saveOrderChange();
        this.orderChanged = false;
      }
    }, 3000);
  }
  ngOnDestroy() {
    if (this.orderChanged) this.saveOrderChange();
    if (this.changeOrderCheck) clearInterval(this.changeOrderCheck);
    if (this.sub) this.sub.unsubscribe();
    if (this.modalSub) this.modalSub.unsubscribe();
  }

  getAllTasksFromServer(): void {
    this.sub = this.dataService.getTasks().subscribe({
      next: res => {
        this.tasks = res;
      },
      error: err => {
        this.displayInfoBubble(MessageType.Error, err);
        console.log("Error: " + err);
      }
    });
  }

  onDeleteTaskClick(task: Task) {
    this.modalSub = this.modalService
      .openDeleteConfirmationModal(this.entry, task.title)
      .subscribe((event) => {
        if ( event.state === "confirmed" ) {
          this.deleteTask(task.id);
        }
      });
  }
  deleteTask(id: number) {
    this.sub = this.dataService.deleteTask(id).subscribe({
      next: () => {
        this.displayInfoBubble(MessageType.Info, "Task deleted");
        this.getAllTasksFromServer();
      },
      error: (err: any) => {
        this.displayInfoBubble(MessageType.Error, err);
        console.log("Error: " + err);
      }
    });
  }
  saveOrderChange() {
    let newOrder: { id: number; order: number }[] = this.tasks.map((task, index) => {
      return {id: task.id, order: index};
    });
    this.sub = this.dataService.saveOrder(newOrder).subscribe({
      next: () => {
        this.displayInfoBubble(MessageType.Info, "Changes saved");
        this.getAllTasksFromServer();
      },
      error: (err: any) => {
        this.displayInfoBubble(MessageType.Error, err);
        console.log("Error: " + err);
      }
    });
  }

  addNewTask() {
    //Temporary:
    let task: Task = {
      id: -1,
      title: "New task",
      details: "test details",
      status: "new",
      priority: "top",
      item_order: this.tasks[this.tasks.length - 1].item_order + 1
    };
    this.modalSub = this.modalService
      .openNewTaskModal(this.entry)
      .subscribe((event) => {
        console.log(event);
        if ( event.state === "confirmed" ) {
          event.task.item_order = this.tasks.length + 1;
          this.createTask(event.task);
        }
      });
  }
  createTask(task: Task) {
    this.sub = this.dataService.createTask(task).subscribe({
      next: () => {
        this.displayInfoBubble(MessageType.Info, "Task added");
        this.getAllTasksFromServer();
      },
      error: (err: any) => {
        this.displayInfoBubble(MessageType.Error, err);
        console.log("Error: " + err);
      }
    });
  }

  onEditTaskClick(task: Task) {
    let updatedTask = task;
    this.modalSub = this.modalService
      .openEditTaskModal(this.entry, updatedTask)
      .subscribe((event) => {
        console.log(event);
        if ( event.state === "confirmed" ) {
          this.saveTask(event.task);
        }
      });
  }
  saveTask(task: Task) {
    this.sub = this.dataService.editTask(task).subscribe({
      next: () => {
        this.displayInfoBubble(MessageType.Info, "Task updated");
        this.getAllTasksFromServer();
      },
      error: (err: any) => {
        this.displayInfoBubble(MessageType.Error, err);
        console.log("Error: " + err);
      }
    });
  }

  onChangeTaskStatusClick(task: Task) {
    this.saveTask(task);
  }

  onOrderChange($event: any) {
    this.orderChanged = true;
  }

  displayInfoBubble(type: MessageType, message: string) {
    this.haveMessageToDisplay = true;
    this.infoBubbleType = type;
    this.infoBubbleMessage = message;
    switch ( this.infoBubbleType ) {
      case MessageType.Error:
        this.infoBubbleDisplayTime = 10000;
        break;
      case MessageType.Warning:
        this.infoBubbleDisplayTime = 5000;
        break;
      default:
        this.infoBubbleDisplayTime = 3000;
    }

    let timer: ReturnType<typeof setTimeout> = setTimeout(() => {
      this.haveMessageToDisplay = false;
    }, this.infoBubbleDisplayTime);
  }
}

/*
5. Deploy and upload to git
 */
