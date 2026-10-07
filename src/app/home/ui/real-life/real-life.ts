import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { Reveal } from '../../../shared/directives/reveal';

@Component({
  selector: 'app-real-life',
  imports: [NgOptimizedImage, Reveal],
  templateUrl: './real-life.html',
  styleUrl: './real-life.scss',
})
export class RealLife {}
