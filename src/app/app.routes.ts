import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogListComponent } from './components/blog-list/blog-list';
import { PostDetailComponent } from './components/post-detail/post-detail';
import { AddPostComponent } from './components/add-post/add-post';
import { EditPostComponent } from './components/edit-post/edit-post';

const routes: Routes = [
  { path: '', component: BlogListComponent },
  { path: 'post/:id', component: PostDetailComponent },
  { path: 'add-post', component: AddPostComponent },
  { path: 'edit-post/:id', component: EditPostComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
