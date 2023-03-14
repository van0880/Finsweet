import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    children: [
      {
        path: "",
        loadChildren: () => import('./components/authors/authors.module').then(m => m.AuthorsModule)
      },
      {
        path: "authors",
        loadChildren: () => import('./components/authors/authors.module').then(m => m.AuthorsModule)
      },
      {
        path: "categories",
        loadChildren: () => import('./components/categories/categories.module').then(m => m.CategoriesModule)
      },
      {
        path: "posts",
        loadChildren: () => import('./components/posts/posts.module').then(m => m.PostsModule)
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
