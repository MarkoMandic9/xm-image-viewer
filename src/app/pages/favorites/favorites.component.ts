import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FavoritesService } from './favorites.service';
import { ImageGridComponent } from '../../shared/components/image-grid/image-grid.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  imports: [ImageGridComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
  providers: [FavoritesService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesComponent {
  private readonly favoritesService = inject(FavoritesService);
  private readonly router = inject(Router);

  readonly images = this.favoritesService.images;

  constructor() {
    this.favoritesService.loadFavorites();
  }

  onImageClick(imageId: string): void {
    this.router.navigate(['/favorites', imageId]);
  }
}
