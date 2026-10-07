import { Component } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { CallToAction } from '../shared/ui/call-to-action/call-to-action';
import { Features } from './ui/features/features';
import { Hero } from './ui/hero/hero';
import { RealLife } from './ui/real-life/real-life';

@Component({
  selector: 'app-home',
  imports: [MatDivider, CallToAction, Features, Hero, RealLife],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
