import { Component, input, Input, output } from '@angular/core';
import { ImageGridItemComponent } from '../image-grid-item/image-grid-item.component';
import { CommonModule } from '@angular/common';
import { ImageMetadata } from '../../interface/image-metadata.interface';
import { InfiniteScrollDirective } from '../../directive/infinite-scroll.directive';

@Component({
  selector: 'app-image-grid',
  templateUrl: './image-grid.component.html',
  imports: [ImageGridItemComponent, CommonModule, InfiniteScrollDirective],
  styleUrls: ['./image-grid.component.scss'],
})
export class ImageGridComponent {
  readonly imagesMetaData = input<ImageMetadata[]>();
  readonly nextPage = output<void>();
  readonly imageClick = output<string>();

  onNextPageLoad(): void {
    this.nextPage.emit();
  }
}
