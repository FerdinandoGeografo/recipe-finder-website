import { Component } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { CallToAction } from '../shared/ui/call-to-action/call-to-action';
import { foodPhilosophy, whyWeExist } from './constants/about-content';
import { AboutHero } from './ui/about-hero/about-hero';
import { AboutList } from './ui/about-list/about-list';
import { BeyondThePlate } from './ui/beyond-the-plate/beyond-the-plate';

@Component({
  selector: 'app-about',
  imports: [MatDivider, CallToAction, AboutHero, AboutList, BeyondThePlate],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  protected readonly whyWeExist = whyWeExist;
  protected readonly foodPhilosophy = foodPhilosophy;
}
