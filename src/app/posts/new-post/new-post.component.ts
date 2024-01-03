import { Component } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
	selector: 'app-new-post',
	templateUrl: './new-post.component.html',
	styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent {
	permalink!: string;
	imgSrc: any = './assets/images/image-placeholder.jpg';
	selectedImg: any;
	categoriesList!: Array<any>;
	postForm!: FormGroup;
	post: any;
	formStatus: string = 'Add New';

	constructor(
		private categoryService: CategoriesService,
		private fb: FormBuilder,
		private postService: PostsService,
		private route: ActivatedRoute,
	) {
		this.route.queryParams.subscribe((val) => {
			console.log(val);
			this.postService.loadOneData(val['id']).subscribe((post) => {
				this.post = post;

				this.postForm = this.fb.group({
					title: [
						this.post.title,
						[Validators.required, Validators.minLength(10)],
					],
					permalink: new FormControl(
						{ value: this.post.permalink, disabled: true },
						Validators.required,
					),
					excerpt: [
						this.post.excerpt,
						[Validators.required, Validators.minLength(50)],
					],
					category: [
						`${this.post.category.categoryId}-${this.post.category.category}`,
						Validators.required,
					],
					postImg: ['', Validators.required],
					content: [this.post.content, Validators.required],
				});

				this.imgSrc = this.post.postImgPath;
				this.formStatus = 'Edit';
			});
		});
	}

	ngOnInit() {
		this.categoryService.loadData().subscribe((val) => {
			this.categoriesList = val;
		});
	}

	// convenience getter for easy access to form fields
	get fc() {
		return this.postForm.controls;
	}

	onTitleChanged($event: any) {
		const title = $event.target.value;
		this.permalink = title.replace(/\s+/g, '-');

		const permalinkControl = this.postForm.get('permalink');
		if (permalinkControl) {
			permalinkControl.setValue(this.permalink);
		}
	}

	showPreview($event: any) {
		const reader = new FileReader();
		reader.onload = (e: any) => {
			this.imgSrc = e.target.result;
		};
		reader.readAsDataURL($event.target.files[0]);

		this.selectedImg = $event.target.files[0];
	}

	onSubmit() {
		console.log('PostForm', this.postForm.value);
		let splitted = this.postForm.value.category.split('-'); //to split caategory data at the point of the hiphen

		const postData: Post = {
			title: this.postForm.value.title,
			permalink: this.permalink,
			category: {
				categoryId: splitted[0],
				category: splitted[1],
			},
			postImgPath: '',
			excerpt: this.postForm.value.excerpt,
			content: this.postForm.value.content,
			isFeatured: false,
			views: 0,
			status: 'new',
			createdAt: new Date(),
		};

		console.log(postData);
		this.postService.uploadImage(this.selectedImg, postData);

		this.postForm.reset();
		this.imgSrc = './assets/images/image-placeholder.jpg';
	}
}
