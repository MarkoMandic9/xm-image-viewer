import { Routes } from '@angular/router';

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
    path: 'photos/{id}',
    loadComponent: () =>
      import('./pages/photo-view/photo-view.component').then(
        (m) => m.PhotoViewComponent
      ),
    title: 'Photo details',
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
