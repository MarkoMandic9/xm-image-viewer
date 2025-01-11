import { Component, inject, OnInit, Signal } from '@angular/core';
import { ImageGridComponent } from '../../shared/components/image-grid/image-grid.component';
import { ImageMetadata } from '../../shared/interface/image-metadata.interface';
import { MainListService } from './main-list.service';
import { StorageService } from '../../shared/service/storage.service';

@Component({
  selector: 'app-main-list',
  imports: [ImageGridComponent],
  templateUrl: './main-list.component.html',
  styleUrl: './main-list.component.scss',
})
export class MainListComponent implements OnInit {
  private mainListService = inject(MainListService);

  images: Signal<ImageMetadata[]> = this.mainListService.images;

  ngOnInit(): void {
    this.mainListService.loadNextPage();
  }

  onNextPage(): void {
    this.mainListService.loadNextPage();
  }

  onImageClick(id: string): void {
    this.mainListService.addToFavorites(id);
  }
}
