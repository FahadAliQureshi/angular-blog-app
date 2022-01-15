import { Component, OnInit } from '@angular/core';
import { Blog, BlogPost } from '../../services/blog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.html',
  styleUrls: ['./add-post.css'],
})
export class AddPostComponent implements OnInit {
  post: Omit<BlogPost, 'id'> = {
    title: '',
    body: '',
    userId: 1,
  };
  loading = false;
  error = '';

  constructor(private blogService: Blog, private router: Router) {}

  ngOnInit(): void {
    // Component initialization
  }

  onSubmit(): void {
    if (!this.post.title.trim() || !this.post.body.trim()) {
      this.error = 'Title and body are required';
      return;
    }

    this.loading = true;
    this.error = '';

    this.blogService.createPost(this.post).subscribe({
      next: (newPost) => {
        console.log('Post created:', newPost);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error creating post:', error);
        this.error = 'Failed to create post. Please try again.';
        this.loading = false;
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
