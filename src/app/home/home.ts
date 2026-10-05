import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { Hero } from './ui/hero/hero';
import { Features } from './ui/features/features';
import { CallToAction } from '../shared/ui/call-to-action/call-to-action';

@Component({
  selector: 'app-home',
  imports: [MatDividerModule, Hero, Features, CallToAction],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
