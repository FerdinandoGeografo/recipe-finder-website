import { Component, input } from '@angular/core';

// Empty, error and not-found states: a message and the projected action.
@Component({
  selector: 'app-state-message',
  templateUrl: './state-message.html',
  styleUrl: './state-message.scss',
})
export class StateMessage {
  readonly message = input.required<string>();
}
