import { Directive, ElementRef, inject } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { debounceTime, filter, fromEvent, map } from 'rxjs';

const SCROLL_OFFSET = 0.8;

@Directive({
    selector: '[infiniteScroll]',
    standalone: true,
})
export class InfiniteScrollDirective {
    private elementRef: ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>);

    readonly infiniteScroll = outputFromObservable(
        fromEvent(this.elementRef.nativeElement, 'scroll').pipe(
            debounceTime(200),
            filter(() => this.isScrolled),
            map(() => true),
        )
    );

    private get scrollHeight(): number {
        return this.elementRef.nativeElement.scrollHeight;
    }

    private get clientHeight(): number {
        return this.elementRef.nativeElement.clientHeight;
    }

    private get scrollTop(): number {
        return this.elementRef.nativeElement.scrollTop;
    }

    private get isScrolled(): boolean {
        return this.scrollTop >= (this.scrollHeight - this.clientHeight) * SCROLL_OFFSET; 
    }
}
