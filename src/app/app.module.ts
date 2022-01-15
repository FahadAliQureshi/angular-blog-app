import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app';
import { BlogListComponent } from './components/blog-list/blog-list';
import { PostDetailComponent } from './components/post-detail/post-detail';
import { AddPostComponent } from './components/add-post/add-post';
import { EditPostComponent } from './components/edit-post/edit-post';

@NgModule({
  declarations: [
    AppComponent,
    BlogListComponent,
    PostDetailComponent,
    AddPostComponent,
    EditPostComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
