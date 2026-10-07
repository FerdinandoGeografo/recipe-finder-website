import { DestroyRef, Directive, ElementRef, inject } from '@angular/core';
import { PageFocus } from '../data-access/page-focus';

// Marks the page h1 that receives focus after navigation; tabindex keeps it out of the Tab order.
@Directive({
  selector: 'h1[appPageHeading]',
  host: { tabindex: '-1' },
})
export class PageHeading {
  constructor() {
    const heading =
      inject<ElementRef<HTMLHeadingElement>>(ElementRef).nativeElement;
    const pageFocus = inject(PageFocus);

    pageFocus.register(heading);
    inject(DestroyRef).onDestroy(() => pageFocus.unregister(heading));
  }
}
