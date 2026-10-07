import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { PageHeading } from '../../../shared/directives/page-heading';

@Component({
  selector: 'app-about-hero',
  imports: [NgOptimizedImage, PageHeading],
  templateUrl: './about-hero.html',
  styleUrl: './about-hero.scss',
})
export class AboutHero {}
