import { Component, input, Input, output } from '@angular/core';
import { ImageDetailsComponent } from '../image-details/image-details.component';
import { CommonModule } from '@angular/common';
import { ImageMetadata } from '../interface/image-metadata.interface';
import { InfiniteScrollDirective } from '../directive/infinite-scroll.directive';

@Component({
  selector: 'app-image-grid',
  templateUrl: './image-grid.component.html',
  imports: [ImageDetailsComponent, CommonModule, InfiniteScrollDirective],
  styleUrls: ['./image-grid.component.scss'],
})
export class ImageGridComponent {
  imagesMetaData = input<ImageMetadata[]>();
  nextPage = output<void>();
  imageClick = output<string>();

  onNextPageLoad(): void {
    this.nextPage.emit();
  }
}
