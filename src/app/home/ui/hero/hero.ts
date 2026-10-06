import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { PageHeading } from '../../../shared/directives/page-heading';

@Component({
  selector: 'app-hero',
  imports: [NgOptimizedImage, MatButton, RouterLink, PageHeading],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {}
