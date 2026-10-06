import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Reveal } from '../../../shared/directives/reveal';
import { features } from '../../constants/features';

@Component({
  selector: 'app-features',
  imports: [MatIcon, Reveal],
  templateUrl: './features.html',
  styleUrl: './features.scss',
})
export class Features {
  protected readonly features = features;
}
