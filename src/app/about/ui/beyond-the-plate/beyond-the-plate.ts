import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { Reveal } from '../../../shared/directives/reveal';

@Component({
  selector: 'app-beyond-the-plate',
  imports: [NgOptimizedImage, Reveal],
  templateUrl: './beyond-the-plate.html',
  styleUrl: './beyond-the-plate.scss',
})
export class BeyondThePlate {}
