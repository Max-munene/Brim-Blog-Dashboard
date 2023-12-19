import { Component } from '@angular/core';
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

	constructor(private categoryService: CategoriesService) {}

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
