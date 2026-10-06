import { Reveal } from '../shared/directives/reveal';
import { whyWeExist, foodPhilosophy } from './constants/about-content';
import { Component } from '@angular/core';
import { CallToAction } from '../shared/ui/call-to-action/call-to-action';
import { AboutList } from './ui/about-list/about-list';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-about',
  imports: [Reveal, AboutList, CallToAction, MatDivider],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  protected readonly whyWeExist = whyWeExist;
  protected readonly foodPhilosophy = foodPhilosophy;
}
