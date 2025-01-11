import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ImageMetadata } from '../../interface/image-metadata.interface';

@Component({
  selector: 'app-image-grid-item',
  imports: [CommonModule, NgOptimizedImage, MatIconModule],
  templateUrl: './image-grid-item.component.html',
  styleUrl: './image-grid-item.component.scss',
})
export class ImageGridItemComponent {
  imageData = input<ImageMetadata>();
  imageClick = output<string>();
  isFavorite = false;

  onImageClick(id: string | undefined): void {
    console.log(`Image ${id} added to favorites!`);
    this.isFavorite = true;

    setTimeout(() => {
      this.isFavorite = false;
    }, 1000);
    if (id) {
      this.imageClick.emit(id);
    }
  }
}
