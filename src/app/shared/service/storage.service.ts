import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class StorageService {

    getObject<T>(key: string): T | null {
        const storageItem = localStorage.getItem(key);
        if (storageItem == null) return null;
        return JSON.parse(storageItem) as T;
    }

    append<T>(key: string, value: T): void {
        const objects = this.getObject<T[]>(key) ?? [];
        this.storeObject(key, [...objects, value]);
    }

    storeObject(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    remove(key: string): void {
        localStorage.removeItem(key);
    }
}