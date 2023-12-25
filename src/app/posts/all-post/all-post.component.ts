import { Component } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
	selector: 'app-all-post',
	templateUrl: './all-post.component.html',
	styleUrls: ['./all-post.component.css'],
})
export class AllPostComponent {
	postsArray!: Array<any>;
	constructor(private postService: PostsService) {}

	ngOnInit() {
		this.postService.loadData().subscribe((val) => {
			console.log(val);
			this.postsArray = val;
		});
	}
}
