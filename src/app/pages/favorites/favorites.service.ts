import { inject, Injectable, Signal, signal } from "@angular/core";
import { ImageMetadata } from "../../shared/interface/image-metadata.interface";
import { StorageService } from "../../shared/service/storage.service";
import { FAVORITES_STORAGE_PATH } from "../../shared/constants";

@Injectable()
export class FavoritesService {
    private storageService = inject(StorageService);

    private favoritesList = signal<ImageMetadata[]>([]);

    get images(): Signal<ImageMetadata[]> {
        return this.favoritesList.asReadonly();
    }

    loadFavorites(): void {
        this.favoritesList.set(this.storageService.getObject(FAVORITES_STORAGE_PATH) ?? []);
    }

}
