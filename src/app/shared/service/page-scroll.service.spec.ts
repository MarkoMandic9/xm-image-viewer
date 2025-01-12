import { TestBed } from '@angular/core/testing';
import { PageScrollService } from './page-scroll.service';
import { fakeAsync, tick } from '@angular/core/testing';

const SCROLL_EVENT = new Event('scroll');

describe('PageScrollService', () => {
  let service: PageScrollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageScrollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('pageScroll$', () => {
    beforeEach(() => {
      Object.defineProperty(document.documentElement, 'scrollHeight', { value: 2000, configurable: true });
      Object.defineProperty(document.documentElement, 'clientHeight', { value: 1000, configurable: true });
      Object.defineProperty(document.documentElement, 'scrollTop', { value: 1600, configurable: true, writable: true });
    });

    it('should emit true when scrolled past the offset', fakeAsync(() => {
      let scrolled = false;

      service.pageScroll$.subscribe(() => {
        scrolled = true;
      });

      document.dispatchEvent(SCROLL_EVENT);

      tick(200); 

      expect(scrolled).toBe(true);
    }));

    it('should not emit if the scroll position is below the threshold', fakeAsync(() => {
      let scrolled = false;

      Object.defineProperty(document.documentElement, 'scrollTop', { value: 500 });

      service.pageScroll$.subscribe(() => {
        scrolled = true;
      });

      document.dispatchEvent(SCROLL_EVENT);

      tick(200); 

      expect(scrolled).toBe(false);
    }));

    it('should not emit if the same scroll height is already triggered', fakeAsync(() => {
      let emissionCount = 0;

      service.pageScroll$.subscribe(() => {
        emissionCount++;
      });

      document.dispatchEvent(SCROLL_EVENT);
      tick(200); 
      document.dispatchEvent(SCROLL_EVENT);
      tick(200); 

      expect(emissionCount).toBe(1);
    }));
  });
});
