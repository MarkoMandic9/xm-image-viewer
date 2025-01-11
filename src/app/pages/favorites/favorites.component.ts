import { Component, inject } from '@angular/core';
import { FavoritesService } from './favorites.service';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ImageGridComponent } from '../../shared/components/image-grid/image-grid.component';

@Component({
  selector: 'app-favorites',
  imports: [ImageGridComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
  providers: [FavoritesService],
})
export class FavoritesComponent {
  private favoritesService = inject(FavoritesService);
  readonly images = this.favoritesService.images;

  constructor() {
    this.favoritesService.loadFavorites();
  }
}
