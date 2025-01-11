import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PhotoViewService } from './photo-view.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ImageMetadata } from '../../shared/interface/image-metadata.interface';

@Component({
  selector: 'app-photo-view',
  imports: [MatButtonModule, CommonModule, NgOptimizedImage],
  templateUrl: './photo-view.component.html',
  styleUrl: './photo-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoViewComponent {
  private photoViewService = inject(PhotoViewService);
  private router = inject(Router);

  readonly image = this.photoViewService.image;

  onImageClick(imageData: ImageMetadata): void {
    window.location.href = imageData.fullUrl;
  }

  onRemoveBtnClick(id: string): void {
    this.photoViewService.removeFromFavorites(id);
    this.router.navigate(['/favorites']);
  }
}
