import { Injectable } from '@angular/core';
import { Task } from "./task.interface";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, tap, catchError, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _tasksUrl = "http://localhost:8000/api/tasks";
  private _tasksOrderUrl = "http://localhost:8000/api/tasks-order";
  private _newTaskUrl = "http://localhost:8000/api/new-task";
  constructor(private httpClient: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this._tasksUrl).pipe(
      // tap(data => console.log("Data fetched: " + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getTaskByID(id: number): Observable<Task> {
    return this.httpClient.get<Task>(this._tasksUrl + "/" + id).pipe(
      tap(data => console.log("Data fetched: " + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  createTask(task: Task): Observable<Task> {
    return this.httpClient.post<Task>(this._newTaskUrl, task).pipe(
      tap(data => console.log("Data posted: " + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  editTask(task: Task): Observable<Task> {
    return this.httpClient.patch<Task>(this._tasksUrl + "/" + task.id, task).pipe(
      tap(data => console.log("Data posted: " + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  saveOrder(newOrder: {id: number, order: number}[]): Observable<any> {
    return this.httpClient.post<Task>(this._tasksOrderUrl, newOrder ).pipe(
      catchError(this.handleError)
    );
  }
  deleteTask(id: number): Observable<any> {
    return this.httpClient.delete(this._tasksUrl + "/" + id).pipe(
      // tap(data => console.log("Task deleted: " + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  handleError(err: HttpErrorResponse) {
    let errorMessage = "";
    if ( err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }

}
