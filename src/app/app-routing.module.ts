import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'blog',
    pathMatch: 'full'
  },
  { path: 'produtos', loadChildren: './produtos/produtos.module#ProdutosPageModule' },
  { path: 'blog', loadChildren: './blog/blog.module#BlogPageModule' },
  { path: 'agenda', loadChildren: './agenda/agenda.module#AgendaPageModule' },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
  { path: 'product-details', loadChildren: './product-details/product-details.module#ProductDetailsPageModule' },
  { path: 'jogo', loadChildren: './jogo/jogo.module#JogoPageModule' },
  { path: 'minhas-materias', loadChildren: './minhas-materias/minhas-materias.module#MinhasMateriasPageModule' },
  { path: 'crud-event', loadChildren: './crud-event/crud-event.module#CrudEventPageModule' },  { path: 'blog-post', loadChildren: './blog-post/blog-post.module#BlogPostPageModule' },
  { path: 'register-user', loadChildren: './register-user/register-user.module#RegisterUserPageModule' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
