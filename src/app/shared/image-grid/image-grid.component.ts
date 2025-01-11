import { Component, input, Input } from '@angular/core';
import { ImageDetailsComponent } from '../image-details/image-details.component';
import { CommonModule } from '@angular/common';
import { ImageMetadata } from '../interface/image-metadata.interface';

@Component({
    selector: 'app-image-grid',
    templateUrl: './image-grid.component.html',
    imports: [ImageDetailsComponent, CommonModule],
    styleUrls: ['./image-grid.component.scss']
})
export class ImageGridComponent {
    imagesMetaData = input<ImageMetadata[]>();
}