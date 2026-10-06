import { Component } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { Reveal } from '../shared/directives/reveal';
import { CallToAction } from '../shared/ui/call-to-action/call-to-action';
import { foodPhilosophy, whyWeExist } from './constants/about-content';
import { AboutList } from './ui/about-list/about-list';

@Component({
  selector: 'app-about',
  imports: [MatDivider, Reveal, CallToAction, AboutList],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  protected readonly whyWeExist = whyWeExist;
  protected readonly foodPhilosophy = foodPhilosophy;
}
