import { Component } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { Reveal } from '../shared/directives/reveal';
import { CallToAction } from '../shared/ui/call-to-action/call-to-action';
import { Features } from './ui/features/features';
import { Hero } from './ui/hero/hero';

@Component({
  selector: 'app-home',
  imports: [MatDivider, Reveal, CallToAction, Features, Hero],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
