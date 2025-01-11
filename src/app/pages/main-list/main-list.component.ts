import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, Signal } from '@angular/core';
import { ImageGridComponent } from '../../shared/components/image-grid/image-grid.component';
import { ImageMetadata } from '../../shared/interface/image-metadata.interface';
import { MainListService } from './main-list.service';
import { PageScrollService } from '../../shared/directive/page-scroll.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-main-list',
  imports: [ImageGridComponent],
  templateUrl: './main-list.component.html',
  styleUrl: './main-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainListComponent implements OnInit {
  private mainListService = inject(MainListService);

  readonly images: Signal<ImageMetadata[]> = this.mainListService.images;
  readonly loading: Signal<boolean> = this.mainListService.loading;

  private readonly pageScrollService = inject(PageScrollService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.mainListService.loadInitialPage();

    this.trackPageScroll();
  }

  trackPageScroll(): void {
   this.pageScrollService.pageScroll$.pipe(
     takeUntilDestroyed(this.destroyRef),
   ).subscribe(() => this.mainListService.loadNextPage());
  }

  onImageClick(id: string): void {
    this.mainListService.addToFavorites(id);
  }
}
