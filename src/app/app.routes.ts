import { Routes } from '@angular/router';
import { photoIdResolver } from './pages/photo-view/photo-view-id.resolver';
import { PhotoViewService } from './pages/photo-view/photo-view.service';

export const routes: Routes = [
  {
    path: 'favorites',
    loadComponent: () =>
      import('./pages/favorites/favorites.component').then(
        (m) => m.FavoritesComponent
      ),
    title: 'Favorites',
  },
  {
    path: 'photos/:id',
    loadComponent: () =>
      import('./pages/photo-view/photo-view.component').then(
        (m) => m.PhotoViewComponent
      ),
    resolve: { photo: photoIdResolver },
    providers: [PhotoViewService],
  },
  {
    path: '',
    loadComponent: () =>
      import('./pages/main-list/main-list.component').then(
        (m) => m.MainListComponent
      ),
    title: 'Photos',
  },
];
