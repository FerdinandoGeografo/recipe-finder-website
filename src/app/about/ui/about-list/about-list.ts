import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about-list',
  imports: [MatIconModule],
  templateUrl: './about-list.html',
  styleUrl: './about-list.scss',
})
export class AboutList {
  readonly heading = input.required<string>();
  readonly items = input.required<readonly AboutItem[]>();
}

export interface AboutItem {
  heading: string;
  description: string;
}
