import { inject, Injectable, Signal } from "@angular/core";
import { ImageMetadata } from "../../shared/interface/image-metadata.interface";
import { ImageMetadataService } from "../../shared/service/image-metadata.service";
import { BehaviorSubject, concatMap, filter, scan } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";
import { StorageService } from "../../shared/service/storage.service";
import { FAVORITES_STORAGE_PATH, IMAGE_PAGE_SIZE } from "../../shared/constants";

@Injectable({providedIn: 'root'})
export class MainListService {
    private readonly imageMetadataService = inject(ImageMetadataService);
    private readonly storageService = inject(StorageService);

    private readonly pageIndex$ = new BehaviorSubject<number>(-1);

    private readonly imageList = toSignal(this.pageIndex$.pipe(
        filter((index) => index >= 0),
        concatMap((index) => this.imageMetadataService.getMetadata(index, IMAGE_PAGE_SIZE)),
        scan((loadedImages, imagePage) => [...loadedImages, ...imagePage]),
    ), {initialValue: []});

    get images(): Signal<ImageMetadata[]> {
        return this.imageList ?? [];
    }

    private get imageMap(): Map<string, ImageMetadata> {
        return new Map(this.images().map((img) => [img.id, img]));
    }

    loadNextPage(): void {
        this.pageIndex$.next(this.pageIndex$.value + 1);
    }

    addToFavorites(id: string): boolean {
        const image = this.getImage(id);
        if (image == null) return false;

        this.storageService.append(FAVORITES_STORAGE_PATH, image);

        return true;
    }

    private getImage(id: string): ImageMetadata | undefined {
        return this.imageMap.get(id);
    }

}