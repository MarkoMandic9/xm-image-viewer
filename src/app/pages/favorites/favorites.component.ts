import { Component, inject } from '@angular/core';
import { FavoritesService } from './favorites.service';
import { Router } from '@angular/router';
import { ImageGridComponent } from '../../shared/components/image-grid/image-grid.component';

@Component({
  selector: 'app-favorites',
  imports: [ImageGridComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
  providers: [FavoritesService],
})
export class FavoritesComponent {
  private readonly favoritesService = inject(FavoritesService);
  private readonly router = inject(Router);
  readonly images = this.favoritesService.images;

  constructor() {
    this.favoritesService.loadFavorites();
  }

  onImageClick(id: string): void {
    this.router.navigate(['/photos', id]);
  }
}
