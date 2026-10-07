import { Component, input } from '@angular/core';

@Component({
  selector: 'app-state-message',
  templateUrl: './state-message.html',
  styleUrl: './state-message.scss',
})
export class StateMessage {
  readonly message = input.required<string>();
}
