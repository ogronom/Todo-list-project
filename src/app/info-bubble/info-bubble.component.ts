import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-info-bubble',
  templateUrl: './info-bubble.component.html',
  styleUrls: ['./info-bubble.component.css']
})
export class InfoBubbleComponent implements OnInit {
  @Input() infoBubbleMessage: string = "";
  @Input() infoBubbleType: string = "info";
  @Input() infoBubbleDisplayTime: number = 5000;

  startFadeOut = false;
  ngOnInit(): void {
    let fadeOutStart = this.infoBubbleDisplayTime >= 2000 ?
      this.infoBubbleDisplayTime - 1990 : //A bit less than 2s set for fade out to avoid blinking at the end
      0;
    let timer: ReturnType<typeof setTimeout> = setTimeout(() => {
      this.startFadeOut = true;
    }, fadeOutStart);
  }
}
