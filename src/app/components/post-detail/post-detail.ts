import { Component, OnInit } from '@angular/core';
import { Blog, BlogPost } from '../../services/blog';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.html',
  styleUrls: ['./post-detail.css'],
})
export class PostDetailComponent implements OnInit {
  post: BlogPost = {} as BlogPost;
  loading = true;
  postId: number = 0;

  constructor(private blog: Blog, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.postId = +params['id'];
      this.loadPost();
    });
  }

  loadPost(): void {
    this.blog.getPost(this.postId).subscribe({
      next: (post) => {
        this.post = post;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading post:', error);
        this.loading = false;
      },
    });
  }

  editPost(): void {
    this.router.navigate(['/edit-post', this.postId]);
  }

  deletePost(): void {
    if (confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      this.blog.deletePost(this.postId).subscribe({
        next: () => {
          console.log('Post deleted successfully');
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error deleting post:', error);
          alert('Failed to delete post. Please try again.');
        },
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
