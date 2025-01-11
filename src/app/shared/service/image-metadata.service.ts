import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ImageResponse } from "../interface/image-reponse.interface";
import { map, Observable } from "rxjs";
import { ImageMetadata } from "../interface/image-metadata.interface";

const SERVER_URL = 'https://picsum.photos';
const METADATA_API_PATH = '/v2/list';

@Injectable({providedIn: 'root'})
export class ImageMetadataService {
    
    private http = inject(HttpClient);

    getMetadata(pageIndex: number, pageSize: number): Observable<ImageMetadata[]> {
        return this.http.get<ImageResponse[]>(METADATA_API_PATH, {params: { page: pageIndex, limit: pageSize }}).pipe(
            map((response) => response.map(({id, author, download_url: fullUrl}) => ({
                id,
                author,
                fullUrl,
                listUrl: this.getListUrlForId(id),
            } satisfies ImageMetadata)))
        );
    }

    private getListUrlForId(id: string): string {
        return SERVER_URL + `id/${id}200/300.webp`;
    }
}