import { Reveal } from '../../../shared/directives/reveal';
import { features } from '../../constants/features';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-features',
  imports: [Reveal, MatIcon],
  templateUrl: './features.html',
  styleUrl: './features.scss',
})
export class Features {
  protected readonly features = features;
}
