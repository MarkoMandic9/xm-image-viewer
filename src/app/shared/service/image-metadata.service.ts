import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ImageResponse } from "../interface/image-reponse.interface";
import { map, Observable, retry } from "rxjs";
import { ImageMetadata } from "../interface/image-metadata.interface";

const SERVER_URL = 'https://picsum.photos';
const METADATA_API_PATH = '/v2/list';

@Injectable({providedIn: 'root'})
export class ImageMetadataService {
    
    private http = inject(HttpClient);

    getMetadata(pageIndex: number, pageSize: number): Observable<ImageMetadata[]> {
        return this.http.get<ImageResponse[]>(SERVER_URL + METADATA_API_PATH, {params: { page: pageIndex, limit: pageSize }}).pipe(
            map((response) => response.map((item) => this.mapResponse(item))),
            retry(4),
        );
    }

    getImageData(id: string): Observable<ImageMetadata> {
        return this.http.get<ImageResponse>(this.getInfoUrlForId(id)).pipe(
            map((response) => this.mapResponse(response)),
            retry(4),
        );
    }

    private getListUrlForId(id: string): string {
        return SERVER_URL + `id/${id}200/300.webp`;
    }

    private getInfoUrlForId(id: string): string {
        return SERVER_URL + `id/${id}/info`;
    }

    private mapResponse(responseItem: ImageResponse): ImageMetadata {
        return {
            id: responseItem.id,
            author: responseItem.author,
            fullUrl: responseItem.download_url,
            listUrl: this.getListUrlForId(responseItem.id),
        } satisfies ImageMetadata;
    }
}