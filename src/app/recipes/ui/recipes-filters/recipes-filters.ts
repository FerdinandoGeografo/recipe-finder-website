import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectedPosition } from '@angular/cdk/overlay';
import { afterNextRender, Component, ElementRef, inject, Injector, input, output, signal, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { RecipeFilter } from '../../data-access/recipe-filter';

type TimeFilterKey = 'maxPrepTime' | 'maxCookTime';

@Component({
  selector: 'app-recipes-filters',
  imports: [
    CdkConnectedOverlay,
    CdkOverlayOrigin,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
  ],
  templateUrl: './recipes-filters.html',
  styleUrl: './recipes-filters.scss',
})
export class RecipesFilters {
  private readonly injector = inject(Injector);
  private readonly search = viewChild.required<ElementRef<HTMLInputElement>>('search');

  readonly filter = input.required<RecipeFilter>();
  readonly filterChange = output<Partial<RecipeFilter>>();

  protected readonly openFilter = signal<TimeFilterKey | undefined>(undefined);
  protected readonly timeFilters = [
    { key: 'maxPrepTime', label: 'Max Prep Time', options: [0, 5, 10] },
    { key: 'maxCookTime', label: 'Max Cook Time', options: [0, 5, 10, 15, 20] },
  ] as const;
  protected readonly positions: ConnectedPosition[] = [
    { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 6 },
    { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -6 },
  ];

  focusSearch(): void {
    this.search().nativeElement.focus();
  }

  protected selectTime(key: TimeFilterKey, minutes?: number): void {
    this.filterChange.emit({ [key]: minutes });
  }

  protected togglePanel(key: TimeFilterKey): void {
    this.openFilter.update((open) => open === key ? undefined : key);
  }

  protected closePanel(origin: CdkOverlayOrigin, restoreFocus = true): void {
    this.openFilter.set(undefined);
    if (restoreFocus) origin.elementRef.nativeElement.focus({ preventScroll: true });
  }

  protected focusPanel(overlay: CdkConnectedOverlay, key: TimeFilterKey): void {
    afterNextRender(() => {
      if (this.openFilter() !== key) return;
      const panel = overlay.overlayRef.overlayElement;
      const radio = panel.querySelector<HTMLInputElement>('input:checked') ??
        panel.querySelector<HTMLInputElement>('input[type="radio"]');
      radio?.focus({ preventScroll: true });
    }, { injector: this.injector });
  }

  protected onKeydown(event: KeyboardEvent, origin: CdkOverlayOrigin): void {
    if (event.key !== 'Escape') return;
    event.preventDefault();
    this.closePanel(origin);
  }

  protected onOutsideClick(event: MouseEvent, origin: CdkOverlayOrigin): void {
    if (!origin.elementRef.nativeElement.contains(event.target as Node)) {
      this.closePanel(origin, false);
    }
  }

  protected onFocusOut(event: FocusEvent, origin: CdkOverlayOrigin): void {
    if (!(event.currentTarget as HTMLElement).contains(event.relatedTarget as Node)) {
      this.closePanel(origin, false);
    }
  }

  protected onDetach(key: TimeFilterKey): void {
    if (this.openFilter() === key) this.openFilter.set(undefined);
  }
}
