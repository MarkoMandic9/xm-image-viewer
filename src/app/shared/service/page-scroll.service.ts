import { Injectable } from '@angular/core';
import { debounceTime, filter, fromEvent, map, tap } from 'rxjs';

const SCROLL_OFFSET = 0.8;

@Injectable({ providedIn: 'root' })
export class PageScrollService {
    private readonly scrolledTriggers = new Set<number>();

    readonly pageScroll$ = fromEvent(document, 'scroll').pipe(
        debounceTime(200),
        filter(() => this.isScrolled && !this.scrolledTriggers.has(this.scrollHeight)),
        tap(() => this.scrolledTriggers.add(this.scrollHeight)),
        map(() => true),
    );

    private get scrollHeight(): number {
        return document.documentElement.scrollHeight;
    }

    private get clientHeight(): number {
        return document.documentElement.clientHeight;
    }

    private get scrollTop(): number {
        return document.documentElement.scrollTop;
    }

    private get isScrolled(): boolean {
        return this.scrollTop >= (this.scrollHeight - this.clientHeight) * SCROLL_OFFSET; 
    }
}
