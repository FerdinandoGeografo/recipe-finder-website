import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-footer',
  imports: [MatToolbarModule],
  template: `
    <footer class="footer">
      <mat-toolbar class="footer__toolbar">
        <span>Made with ❤️ and 🥑</span>

        <div class="footer__socials"></div>
      </mat-toolbar>
    </footer>
  `,
  styles: `
    @use '@angular/material' as mat;

    :host {

    }
  `,
})
export class Footer {}
