import { inject, Injectable, signal } from "@angular/core";
import { ImageMetadata } from "../../shared/interface/image-metadata.interface";
import { StorageService } from "../../shared/service/storage.service";
import { FAVORITES_STORAGE_PATH } from "../../shared/constants";

@Injectable()
export class FavortiesService {
    private favoritesList = signal<ImageMetadata[]>([]);

    private storageService = inject(StorageService);

    loadFavorites(): void {
        this.favoritesList.set(this.storageService.getObject(FAVORITES_STORAGE_PATH) ?? []);
    }

    removeFromFavorites(id: string): void {
        this.storageService.update<ImageMetadata[]>(id, 
            (favorites) => favorites.filter(({id: imageId}) => id !== imageId));
    }
}
