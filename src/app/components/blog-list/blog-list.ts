import { Component, OnInit } from '@angular/core';
import { Blog, BlogPost } from '../../services/blog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.html',
  styleUrls: ['./blog-list.css'],
})
export class BlogListComponent implements OnInit {
  posts: BlogPost[] = [];
  loading = true;

  constructor(private blogService: Blog, private router: Router) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.blogService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading posts:', error);
        this.loading = false;
      },
    });
  }

  viewPost(id: number): void {
    this.router.navigate(['/post', id]);
  }

  addPost(): void {
    this.router.navigate(['/add-post']);
  }

  editPost(id: number): void {
    this.router.navigate(['/edit-post', id]);
  }

  deletePost(id: number, event: Event): void {
    event.stopPropagation(); // Prevent card click event

    if (confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      this.blogService.deletePost(id).subscribe({
        next: () => {
          console.log('Post deleted successfully');
          // Remove the post from the local array
          this.posts = this.posts.filter((post) => post.id !== id);
        },
        error: (error) => {
          console.error('Error deleting post:', error);
          alert('Failed to delete post. Please try again.');
        },
      });
    }
  }
}
