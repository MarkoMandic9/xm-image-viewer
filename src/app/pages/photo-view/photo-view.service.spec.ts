import { TestBed } from '@angular/core/testing';
import { PhotoViewService } from './photo-view.service';
import { StorageService } from '../../shared/service/storage.service';
import { ImageMetadataService } from '../../shared/service/image-metadata.service';
import { ImageMetadata } from '../../shared/interface/image-metadata.interface';
import { FAVORITES_STORAGE_PATH } from '../../shared/constants';
import { of, throwError } from 'rxjs';

describe('PhotoViewService', () => {
  let service: PhotoViewService;
  let storageServiceSpy: jasmine.SpyObj<StorageService>;
  let imageMetadataServiceSpy: jasmine.SpyObj<ImageMetadataService>;

  const mockImage: ImageMetadata = {
    id: '1',
    author: 'Author 1',
    listUrl: 'listUrl1',
    fullUrl: 'fullUrl1',
  };

  beforeEach(() => {
    const storageSpy = jasmine.createSpyObj('StorageService', ['find', 'update']);
    const imageMetadataSpy = jasmine.createSpyObj('ImageMetadataService', ['getImageData']);

    TestBed.configureTestingModule({
      providers: [
        PhotoViewService,
        { provide: StorageService, useValue: storageSpy },
        { provide: ImageMetadataService, useValue: imageMetadataSpy },
      ],
    });

    service = TestBed.inject(PhotoViewService);
    storageServiceSpy = TestBed.inject(StorageService) as jasmine.SpyObj<StorageService>;
    imageMetadataServiceSpy = TestBed.inject(ImageMetadataService) as jasmine.SpyObj<ImageMetadataService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('selectImage', () => {
    it('should fetch image metadata from storage if it exists', (done) => {
      storageServiceSpy.find.and.returnValue(mockImage);

      service.selectImage(mockImage.id);

      setTimeout(() => {
        expect(service.image()).toEqual(mockImage);
        done();
      });
    });

    it('should fetch image metadata from the metadata service if not in storage', (done) => {
      storageServiceSpy.find.and.returnValue(undefined);
      imageMetadataServiceSpy.getImageData.and.returnValue(of(mockImage));

      service.selectImage(mockImage.id);

      setTimeout(() => {
        expect(imageMetadataServiceSpy.getImageData).toHaveBeenCalledWith(mockImage.id);
        expect(service.image()).toEqual(mockImage);
        done();
      });
    });
  });

  describe('error', () => {
    it('should reset error state after successful fetch', (done) => {
      storageServiceSpy.find.and.returnValue(undefined);
      imageMetadataServiceSpy.getImageData.and.returnValue(of(mockImage));

      service.selectImage(mockImage.id);

      setTimeout(() => {
        expect(service.error()).toBeFalse();
        done();
      });
    });
  });
});
