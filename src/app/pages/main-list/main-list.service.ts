import { inject, Injectable, signal, Signal } from "@angular/core";
import { ImageMetadata } from "../../shared/interface/image-metadata.interface";
import { ImageMetadataService } from "../../shared/service/image-metadata.service";
import { catchError, map, merge, of, scan, share, Subject, switchMap } from "rxjs";
import { takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop";
import { StorageService } from "../../shared/service/storage.service";
import { FAVORITES_STORAGE_PATH, IMAGE_PAGE_SIZE } from "../../shared/constants";

@Injectable({providedIn: 'root'})
export class MainListService {
    private readonly imageMetadataService = inject(ImageMetadataService);
    private readonly storageService = inject(StorageService);

    private readonly incrementPage$ = new Subject<void>();

    private readonly pageIndex = signal(1);

    private readonly imagePage$ = this.incrementPage$.pipe(
        switchMap(() => this.imageMetadataService.getMetadata(this.pageIndex(), IMAGE_PAGE_SIZE)),
        share(),
    );

    readonly images = toSignal(this.imagePage$.pipe(
        scan((loadedImages, imagePage) => [...loadedImages, ...imagePage], [] as ImageMetadata[])
    ), {initialValue: []});

    readonly error = toSignal(this.imagePage$.pipe(
            catchError(() => of(true)),
            map(() => false),
        ), { initialValue: false });

    readonly loading = toSignal(
        merge(
            this.incrementPage$.pipe(map(() => true)),
            this.imagePage$.pipe(map(() => false)),
        ), { initialValue: false }
    );

    
    constructor() {
        this.imagePage$.pipe(
            takeUntilDestroyed(),
        ).subscribe(() => this.pageIndex.update((index) => index + 1));
    }

    private get imageMap(): Map<string, ImageMetadata> {
        return new Map(this.images().map((img) => [img.id, img]));
    }

    loadNextPage(): void {
        this.incrementPage$.next();
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