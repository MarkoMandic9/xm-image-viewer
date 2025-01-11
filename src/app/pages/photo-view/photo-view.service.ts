import { inject, Injectable  } from "@angular/core";
import { ImageMetadata } from "../../shared/interface/image-metadata.interface";
import { StorageService } from "../../shared/service/storage.service";
import { FAVORITES_STORAGE_PATH } from "../../shared/constants";
import { toSignal } from "@angular/core/rxjs-interop";
import { ImageMetadataService } from "../../shared/service/image-metadata.service";
import { catchError, map, merge, of, Subject, switchMap } from "rxjs";

@Injectable()
export class PhotoViewService {
    private readonly storageService = inject(StorageService);
    private readonly imageMetadataService = inject(ImageMetadataService);

    private readonly selectedImageId$ = new Subject<string | undefined>();

    private readonly selectedImage$ = this.selectedImageId$.pipe(
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
    );

    readonly image = toSignal(this.selectedImage$);

    readonly loading = toSignal(merge(
        this.selectedImageId$.pipe(map(() => true)),
        this.selectedImage$.pipe(map(() => false)),
    ), { initialValue: false });

    readonly error = toSignal(this.selectedImage$.pipe(
        catchError(() => of(true)),
        map(() => false),
    ), {initialValue: false});

    selectImage(id: string): void {
        this.selectedImageId$.next(id);
    }
    
    removeFromFavorites(id: string): void {
        this.storageService.update<ImageMetadata[]>(FAVORITES_STORAGE_PATH, 
            (favorites) => favorites.filter(({id: imageId}) => id !== imageId));
    }

    private loadImageFromStorage(id: string): ImageMetadata | undefined {
        return this.storageService.find<ImageMetadata>(FAVORITES_STORAGE_PATH, 
            ({id: imageId}) => id === imageId);
    }
}