import { TestBed } from '@angular/core/testing';
import { FavoritesService } from './favorites.service';
import { StorageService } from '../../shared/service/storage.service';
import { ImageMetadata } from '../../shared/interface/image-metadata.interface';
import { FAVORITES_STORAGE_PATH } from '../../shared/constants';

describe('FavoritesService', () => {
  let service: FavoritesService;
  let storageServiceSpy: jasmine.SpyObj<StorageService>;

  const mockFavorites: ImageMetadata[] = [
    { id: '1', author: 'Author 1', listUrl: 'listUrl1', fullUrl: 'fullUrl1' },
    { id: '2', author: 'Author 2', listUrl: 'listUrl2', fullUrl: 'fullUrl2' },
  ];

  beforeEach(() => {
    const storageSpy = jasmine.createSpyObj('StorageService', ['getObject']);

    TestBed.configureTestingModule({
      providers: [
        FavoritesService,
        { provide: StorageService, useValue: storageSpy },
      ],
    });

    service = TestBed.inject(FavoritesService);
    storageServiceSpy = TestBed.inject(StorageService) as jasmine.SpyObj<StorageService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadFavorites', () => {
    it('should load favorites from storage', () => {
      storageServiceSpy.getObject.and.returnValue(mockFavorites);

      service.loadFavorites();

      expect(storageServiceSpy.getObject).toHaveBeenCalledWith(FAVORITES_STORAGE_PATH);
      expect(service.images()).toEqual(mockFavorites);
    });

    it('should load an empty array if no favorites are found in storage', () => {
      storageServiceSpy.getObject.and.returnValue(undefined);

      service.loadFavorites();

      expect(storageServiceSpy.getObject).toHaveBeenCalledWith(FAVORITES_STORAGE_PATH);
      expect(service.images()).toEqual([]);
    });
  });

  describe('images', () => {
    it('should return the current favorites list', () => {
      storageServiceSpy.getObject.and.returnValue(mockFavorites);

      service.loadFavorites();

      expect(service.images()).toEqual(mockFavorites);
    });
  });
});
