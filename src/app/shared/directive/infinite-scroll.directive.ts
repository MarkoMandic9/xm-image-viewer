import { Directive, ElementRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { debounceTime, filter, fromEvent, Subscription } from 'rxjs';

@Directive({
    selector: '[appInfiniteScroll]',
    standalone: true,
})
export class InfiniteScrollDirective implements OnDestroy {
    @Input() disabled = false;
    @Input() triggerOffset = 50;
    @Output() nextPage = new EventEmitter<void>();
    @Output() previousPage = new EventEmitter<void>();

    onScrollEvent: Subscription;

    constructor(private elementRef: ElementRef<HTMLElement>) {
        this.onScrollEvent = fromEvent(elementRef.nativeElement, 'wheel')
            .pipe(
                filter(() => !this.disabled),
                debounceTime(200)
            )
            .subscribe(() => {
                this.pagination();
            });
    }

    ngOnDestroy(): void {
        this.onScrollEvent.unsubscribe();
    }

    private pagination(): void {
        if (
            this.elementRef.nativeElement.scrollTop >=
            this.elementRef.nativeElement.scrollHeight - this.elementRef.nativeElement.clientHeight - this.triggerOffset
        ) {
            this.nextPage.emit();
        }
    }
}
