import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoViewComponent } from './photo-view.component';
import { PhotoViewService } from './photo-view.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('PhotoViewComponent', () => {
  let component: PhotoViewComponent;
  let fixture: ComponentFixture<PhotoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoViewComponent],
      providers: [PhotoViewService, provideHttpClient(), provideHttpClientTesting()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
