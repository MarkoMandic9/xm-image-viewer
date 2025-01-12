import { TestBed } from '@angular/core/testing';
import { MainListService } from './main-list.service';
import { ImageMetadataService } from '../../shared/service/image-metadata.service';
import { StorageService } from '../../shared/service/storage.service';
import { of } from 'rxjs';
import { ImageMetadata } from '../../shared/interface/image-metadata.interface';
import { FAVORITES_STORAGE_PATH } from '../../shared/constants';

describe('MainListService', () => {
  let service: MainListService;
  let imageMetadataServiceSpy: jasmine.SpyObj<ImageMetadataService>;
  let storageServiceSpy: jasmine.SpyObj<StorageService>;

  const mockImages: ImageMetadata[] = [
    { id: '1', author: 'Author 1', listUrl: 'listUrl1', fullUrl: 'fullUrl1' },
    { id: '2', author: 'Author 2', listUrl: 'listUrl2', fullUrl: 'fullUrl2' },
  ];

  beforeEach(() => {
    const imageMetadataSpy = jasmine.createSpyObj('ImageMetadataService', ['getMetadata']);
    const storageSpy = jasmine.createSpyObj('StorageService', ['append', 'find']);

    TestBed.configureTestingModule({
      providers: [
        MainListService,
        { provide: ImageMetadataService, useValue: imageMetadataSpy },
        { provide: StorageService, useValue: storageSpy },
      ],
    });

    service = TestBed.inject(MainListService);
    imageMetadataServiceSpy = TestBed.inject(ImageMetadataService) as jasmine.SpyObj<ImageMetadataService>;
    storageServiceSpy = TestBed.inject(StorageService) as jasmine.SpyObj<StorageService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadInitialPage', () => {
    it('should load the first page if the page index is 1', () => {
      spyOn(service as any, 'loadNextPage');

      service.loadInitialPage();

      expect((service as any).loadNextPage).toHaveBeenCalled();
    });

    it('should not load the first page if the page index is greater than 1', () => {
      (service as any).pageIndex.set(2);
      spyOn(service as any, 'loadNextPage');

      service.loadInitialPage();

      expect((service as any).loadNextPage).not.toHaveBeenCalled();
    });
  });

  describe('loadNextPage', () => {
    it('should increment the page index and fetch metadata', (done) => {
      imageMetadataServiceSpy.getMetadata.and.returnValue(of(mockImages));

      service.loadNextPage();

      setTimeout(() => {
        expect(service['pageIndex']()).toBe(2);
        expect(imageMetadataServiceSpy.getMetadata).toHaveBeenCalledWith(1, jasmine.any(Number));
        done();
      });
    });
  });

  describe('addToFavorites', () => {
    it('should add an image to favorites if it is not already a favorite', () => {
      const image = mockImages[0];
      storageServiceSpy.find.and.returnValue(undefined);

      spyOn(service, 'images').and.returnValue([image]);

      const result = service.addToFavorites(image.id);

      expect(result).toBeTrue();
      expect(storageServiceSpy.append).toHaveBeenCalledWith(FAVORITES_STORAGE_PATH, image);
    });

    it('should not add an image to favorites if it is already a favorite', () => {
      const image = mockImages[0];
      storageServiceSpy.find.and.returnValue(image);

      const result = service.addToFavorites(image.id);

      expect(result).toBeFalse();
      expect(storageServiceSpy.append).not.toHaveBeenCalled();
    });

    it('should not add an image to favorites if the image is not found', () => {
      storageServiceSpy.find.and.returnValue(undefined);

      spyOn(service, 'images').and.returnValue([]);

      const result = service.addToFavorites('non-existent-id');

      expect(result).toBeFalse();
      expect(storageServiceSpy.append).not.toHaveBeenCalled();
    });
  });

  describe('error signal', () => {
    it('should set error to false if imagePage$ succeeds', (done) => {
      imageMetadataServiceSpy.getMetadata.and.returnValue(of(mockImages));
      service.loadNextPage();

      setTimeout(() => {
        expect(service.error()).toBeFalse();
        done();
      });
    });
  });
});
