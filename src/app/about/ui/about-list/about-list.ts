import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Reveal } from '../../../shared/directives/reveal';
import { AboutItem } from '../../types/about-item.model';

@Component({
  selector: 'app-about-list',
  imports: [MatIcon, Reveal],
  templateUrl: './about-list.html',
  styleUrl: './about-list.scss',
})
export class AboutList {
  readonly heading = input.required<string>();
  readonly items = input.required<readonly AboutItem[]>();
}
