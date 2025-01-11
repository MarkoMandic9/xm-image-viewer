import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;
  let mockLocalStorage: Record<string, string>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);

    // Mock localStorage
    mockLocalStorage = {};
    spyOn(localStorage, 'getItem').and.callFake((key: string) => mockLocalStorage[key] || null);
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
      mockLocalStorage[key] = value;
    });
    spyOn(localStorage, 'removeItem').and.callFake((key: string) => {
      delete mockLocalStorage[key];
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getObject', () => {
    it('should return undefined if the key does not exist', () => {
      expect(service.getObject('nonexistent')).toBeUndefined();
    });

    it('should return the parsed object if the key exists', () => {
      const mockData = { test: 'value' };
      mockLocalStorage['key'] = JSON.stringify(mockData);

      expect(service.getObject('key')).toEqual(mockData);
    });
  });

  describe('find', () => {
    it('should return undefined if the key does not exist', () => {
      expect(service.find('nonexistent', () => true)).toBeUndefined();
    });

    it('should return the item that matches the callback condition', () => {
      const mockData = [{ id: 1 }, { id: 2 }];
      mockLocalStorage['key'] = JSON.stringify(mockData);

      const result = service.find('key', (item: any) => item.id === 2);
      expect(result).toEqual({ id: 2 });
    });

    it('should return undefined if no item matches the callback condition', () => {
      const mockData = [{ id: 1 }, { id: 2 }];
      mockLocalStorage['key'] = JSON.stringify(mockData);

      const result = service.find('key', (item: any) => item.id === 3);
      expect(result).toBeUndefined();
    });
  });

  describe('append', () => {
    it('should append a value to an existing array in storage', () => {
      const mockData = [{ id: 1 }];
      mockLocalStorage['key'] = JSON.stringify(mockData);

      service.append('key', { id: 2 });

      expect(JSON.parse(mockLocalStorage['key'])).toEqual([{ id: 1 }, { id: 2 }]);
    });

    it('should create a new array if the key does not exist', () => {
      service.append('key', { id: 1 });

      expect(JSON.parse(mockLocalStorage['key'])).toEqual([{ id: 1 }]);
    });
  });

  describe('storeObject', () => {
    it('should store an object in localStorage', () => {
      const mockData = { test: 'value' };

      service.storeObject('key', mockData);

      expect(JSON.parse(mockLocalStorage['key'])).toEqual(mockData);
    });
  });

  describe('update', () => {
    it('should update an object if the key exists', () => {
      const mockData = { id: 1, name: 'Old Name' };
      mockLocalStorage['key'] = JSON.stringify(mockData);

      const updatedObject = service.update('key', (item: any) => ({ ...item, name: 'New Name' }));

      expect(updatedObject).toEqual({ id: 1, name: 'New Name' });
      expect(JSON.parse(mockLocalStorage['key'])).toEqual({ id: 1, name: 'New Name' });
    });

    it('should return undefined if the key does not exist', () => {
      const updatedObject = service.update('nonexistent', (item: any) => ({ ...item, name: 'New Name' }));

      expect(updatedObject).toBeUndefined();
    });
  });
});
