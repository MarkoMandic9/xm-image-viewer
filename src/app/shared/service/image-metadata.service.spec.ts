import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ImageMetadataService } from './image-metadata.service';
import { ImageResponse } from '../interface/image-reponse.interface';
import { ImageMetadata } from '../interface/image-metadata.interface';

const SERVER_URL = 'https://picsum.photos';
const METADATA_API_PATH = '/v2/list';

describe('ImageMetadataService', () => {
  let service: ImageMetadataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ImageMetadataService],
    });
    service = TestBed.inject(ImageMetadataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getMetadata', () => {
    it('should fetch metadata with pagination and map the response', () => {
      const mockResponse: ImageResponse[] = [
        {
          id: '1',
          author: 'Author 1',
          download_url: 'https://example.com/image1.jpg',
        },
        {
          id: '2',
          author: 'Author 2',
          download_url: 'https://example.com/image2.jpg',
        },
      ];

      const expectedResult: ImageMetadata[] = [
        {
          id: '1',
          author: 'Author 1',
          fullUrl: 'https://example.com/image1.jpg',
          listUrl: `${SERVER_URL}/id/1/200/300.webp`,
        },
        {
          id: '2',
          author: 'Author 2',
          fullUrl: 'https://example.com/image2.jpg',
          listUrl: `${SERVER_URL}/id/2/200/300.webp`,
        },
      ];

      service.getMetadata(1, 10).subscribe((metadata) => {
        expect(metadata).toEqual(expectedResult);
      });

      const req = httpMock.expectOne(`${SERVER_URL}${METADATA_API_PATH}?page=1&limit=10`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('getImageData', () => {
    it('should fetch image data by ID and map the response', () => {
      const mockResponse: ImageResponse = {
        id: '1',
        author: 'Author 1',
        download_url: 'https://example.com/image1.jpg',
      };

      const expectedResult: ImageMetadata = {
        id: '1',
        author: 'Author 1',
        fullUrl: 'https://example.com/image1.jpg',
        listUrl: `${SERVER_URL}/id/1/200/300.webp`,
      };

      service.getImageData('1').subscribe((metadata) => {
        expect(metadata).toEqual(expectedResult);
      });

      const req = httpMock.expectOne(`${SERVER_URL}/id/1/info`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });
});
