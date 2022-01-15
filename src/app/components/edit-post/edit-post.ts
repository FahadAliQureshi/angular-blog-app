import { Component, OnInit } from '@angular/core';
import { Blog, BlogPost } from '../../services/blog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.html',
  styleUrls: ['./edit-post.css'],
})
export class EditPostComponent implements OnInit {
  post: BlogPost = {
    id: 0,
    title: '',
    body: '',
    userId: 1,
  };
  loading = true;
  saving = false;
  error = '';
  postId: number = 0;

  constructor(private blogService: Blog, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.postId = +params['id'];
      this.loadPost();
    });
  }

  loadPost(): void {
    this.blogService.getPost(this.postId).subscribe({
      next: (post) => {
        this.post = post;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading post:', error);
        this.error = 'Failed to load post. Please try again.';
        this.loading = false;
      },
    });
  }

  onSubmit(): void {
    if (!this.post.title.trim() || !this.post.body.trim()) {
      this.error = 'Title and body are required';
      return;
    }

    this.saving = true;
    this.error = '';

    this.blogService.updatePost(this.postId, this.post).subscribe({
      next: (updatedPost) => {
        console.log('Post updated:', updatedPost);
        this.router.navigate(['/post', this.postId]);
      },
      error: (error) => {
        console.error('Error updating post:', error);
        this.error = 'Failed to update post. Please try again.';
        this.saving = false;
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/post', this.postId]);
  }
}
