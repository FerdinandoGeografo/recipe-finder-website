import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { socialLinks } from '../../constants/social-links';

@Component({
  selector: 'app-footer',
  imports: [MatIcon],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly socialLinks = socialLinks;
}
