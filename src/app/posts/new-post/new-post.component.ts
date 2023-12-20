import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
	selector: 'app-new-post',
	templateUrl: './new-post.component.html',
	styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent {
	permalink: string = '';
	imgSrc: any = './assets/images/image-placeholder.jpg';
	selectedImg: any;
	categoriesList!: Array<any>;
	postForm!: FormGroup;

	constructor(
		private categoryService: CategoriesService,
		private fb: FormBuilder,
	) {
		this.postForm = this.fb.group({
			title: [''],
			permalink: [''],
			excerpt: [''],
			category: [''],
			postImg: [''],
			content: [''],
		});
	}

	ngOnInit() {
		this.categoryService.loadData().subscribe((val) => {
			this.categoriesList = val;
		});
	}

	onTitleChanged($event: any) {
		const title = $event.target.value;
		this.permalink = title.replace(/\s+/g, '-');
	}

	showPreview($event: any) {
		const reader = new FileReader();
		reader.onload = (e: any) => {
			this.imgSrc = e.target.result;
		};
		reader.readAsDataURL($event.target.files[0]);

		this.selectedImg = $event.target.files[0];
	}
}
