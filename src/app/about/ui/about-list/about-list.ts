import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about-list',
  imports: [MatIconModule],
  templateUrl: './about-list.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './about-list.scss',
})
export class AboutList {
  title = input.required<string>();
  list = input.required<IAbout[]>();
}

export interface IAbout {
  heading: string;
  description: string;
}
