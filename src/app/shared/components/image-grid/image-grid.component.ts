import { ChangeDetectionStrategy, Component, input, Input, output } from '@angular/core';
import { ImageGridItemComponent } from '../image-grid-item/image-grid-item.component';
import { CommonModule } from '@angular/common';
import { ImageMetadata } from '../../interface/image-metadata.interface';

@Component({
  selector: 'app-image-grid',
  templateUrl: './image-grid.component.html',
  imports: [ImageGridItemComponent, CommonModule],
  styleUrls: ['./image-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageGridComponent {
  readonly imagesMetaData = input<ImageMetadata[]>();
  readonly imageClick = output<string>();
}
