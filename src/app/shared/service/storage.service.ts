import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class StorageService {

    getObject<T>(key: string): T | undefined {
        const storageItem = localStorage.getItem(key);
        if (storageItem == null) return undefined;
        return JSON.parse(storageItem) as T;
    }

    find<T>(key: string, callback: (item: T) => boolean) {
        const objects = this.getObject<T[]>(key) ?? [];
        return objects.find(callback);
    }

    append<T>(key: string, value: T): void {
        const objects = this.getObject<T[]>(key) ?? [];
        this.storeObject(key, [...objects, value]);
    }

    storeObject(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    update<T>(key: string, callback: (item: T) => T): T | undefined {
        const object = this.getObject<T>(key);
        if (object == null) return undefined;

        const updatedObject = callback(object);
        this.storeObject(key, updatedObject);

        return updatedObject;
    }
}