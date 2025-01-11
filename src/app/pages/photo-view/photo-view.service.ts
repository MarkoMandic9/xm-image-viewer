import { inject, Injectable, Signal, signal } from "@angular/core";
import { ImageMetadata } from "../../shared/interface/image-metadata.interface";
import { StorageService } from "../../shared/service/storage.service";
import { FAVORITES_STORAGE_PATH } from "../../shared/constants";
import { toSignal } from "@angular/core/rxjs-interop";
import { ImageMetadataService } from "../../shared/service/image-metadata.service";
import { of, Subject, switchMap } from "rxjs";

@Injectable()
export class PhotoViewService {
    private readonly storageService = inject(StorageService);
    private readonly imageMetadataService = inject(ImageMetadataService);

    private readonly selectedImageId$ = new Subject<string | undefined>();

    private readonly selectedImage = toSignal(
        this.selectedImageId$.pipe(
            switchMap((id) => {
                if (id == null) {
                    return of(undefined);
                }

                const storageItem = this.loadImageFromStorage(id);

                if (storageItem != null) {
                    return of(storageItem);
                }
            
                return this.imageMetadataService.getImageData(id);
            }),
        )
        
    );

    get image(): Signal<ImageMetadata | undefined> {
        return this.selectedImage;
    }

    selectImage(id: string): void {
        this.selectedImageId$.next(id);
    }
    
    removeFromFavorites(id: string): void {
        this.storageService.update<ImageMetadata[]>(id, 
            (favorites) => favorites.filter(({id: imageId}) => id !== imageId));
    }

    private loadImageFromStorage(id: string): ImageMetadata | undefined {
        return this.storageService.find<ImageMetadata>(FAVORITES_STORAGE_PATH, 
            ({id: imageId}) => id === imageId);
    }
}