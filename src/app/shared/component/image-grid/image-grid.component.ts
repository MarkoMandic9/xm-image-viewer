import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { ImageGridItemComponent } from '../image-grid-item/image-grid-item.component';
import { CommonModule } from '@angular/common';
import { ImageMetadata } from '../../interface/image-metadata.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NoElemensPanelComponent } from '../no-elements-panel/no-elements-panel.component';

@Component({
  selector: 'app-image-grid',
  templateUrl: './image-grid.component.html',
  imports: [ImageGridItemComponent, CommonModule, MatProgressSpinnerModule, NoElemensPanelComponent],
  styleUrls: ['./image-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageGridComponent {
  readonly imagesMetaData = input<ImageMetadata[]>();
  readonly addToFavoritesEnabled = input<boolean>(false);
  readonly loading = input<boolean>(false);
  readonly imageClick = output<string>();
}
