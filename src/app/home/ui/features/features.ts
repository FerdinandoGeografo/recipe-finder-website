import { features } from '../../constants/features';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-features',
  imports: [MatIcon],
  templateUrl: './features.html',
  styleUrl: './features.scss',
})
export class Features {
  protected readonly features = features;
}
