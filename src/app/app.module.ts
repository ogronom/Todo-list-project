import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { NgOptimizedImage } from "@angular/common";
import { ModalComponent } from './modal/modal.component';
import { TasksDropdownComponent } from './tasks-dropdown/tasks-dropdown.component';
import { InfoBubbleComponent } from './info-bubble/info-bubble.component';
import { FormsModule } from "@angular/forms";
import { ReplaceUnderscorePipe } from './replace-char.pipe';


@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    InfoBubbleComponent,
    ReplaceUnderscorePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    NgOptimizedImage,
    TasksDropdownComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
