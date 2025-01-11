import { inject, Injectable, Signal } from "@angular/core";
import { ImageMetadata } from "../../shared/interface/image-metadata.interface";
import { ImageMetadataService } from "../../shared/service/image-metadata.service";
import { BehaviorSubject, concatMap, scan } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";
import { StorageService } from "../../shared/service/storage.service";
import { FAVORITES_STORAGE_PATH } from "../../shared/constants";

const PAGE_SIZE = 50;

@Injectable({providedIn: 'root'})
export class MainListService {
    private pageIndex$ = new BehaviorSubject<number>(0);

    private imageList = toSignal(this.pageIndex$.pipe(
        concatMap((index) => this.imageMetadataService.getMetadata(index, PAGE_SIZE)),
        scan((loadedImages, imagePage) => [...loadedImages, ...imagePage]),
    ), {initialValue: []});

    private imageMetadataService = inject(ImageMetadataService);
    private storageService = inject(StorageService);

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