import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-call-to-action',
  imports: [RouterLink, MatButton],
  templateUrl: './call-to-action.html',
  styleUrl: './call-to-action.scss',
})
export class CallToAction {}
