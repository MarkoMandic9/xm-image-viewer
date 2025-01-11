import { inject } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { PhotoViewService } from './photo-view.service';

export const photoIdResolver = (route: ActivatedRouteSnapshot) => {
  const photoViewService = inject(PhotoViewService);
  const id = route.paramMap.get('id');

  if (!id) {
    throw new Error('Image ID is required');
  }

  photoViewService.selectImage(id);
};
