import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/contact-list/contact-list.component'),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./components/contact-form/contact-form.component'),
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./components/contact-form/contact-form.component'),
  },
];
