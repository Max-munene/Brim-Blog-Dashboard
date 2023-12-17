import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';

@Component({
	selector: 'app-categories',
	templateUrl: './categories.component.html',
	styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
	categoryArray!: Array<any>;

	constructor(private categoryService: CategoriesService) {}

	ngOnInit(): void {
		this.categoryService.loadData().subscribe((val) => {
			console.log(val);
			this.categoryArray = val;
		});
	}

	// Submit Form Handler
	onSubmit(formData: any) {
		let categoryData: Category = {
			category: formData.value.category,
		};

		this.categoryService.saveData(categoryData);

		// let subCategoryData = {
		// 	subcategory: 'subCategory1',
		// };
		// this.afs
		// 	.collection('categories')
		// 	.add(categoryData)
		// 	.then((docRef) => {
		// 		console.log('Category added with ID:', docRef);

		// 		//path method
		// 		// this.afs.doc(`categories/${docRef.id}`).collection('subcategory').add(subCategoryData)

		// 		this.afs
		// 			.collection('categories')
		// 			.doc(docRef.id)
		// 			.collection('subcategory')
		// 			.add(subCategoryData)
		// 			.then((docRef1) => {
		// 				console.log(docRef1);

		// 				//path method

		// 				// this.afs.doc(`categories/${docRef.id}/subcategory/${docRef1.id}`).collection('subsubcategory').add(subCategoryData)

		// 				this.afs
		// 					.collection('categories')
		// 					.doc(docRef.id)
		// 					.collection('subcategory')
		// 					.doc(docRef1.id)
		// 					.collection('subsubcategory')
		// 					.add(subCategoryData)
		// 					.then((docRef2) => {
		// 						console.log('subsubcaterogy added successfully', docRef2);
		// 					});
		// 			});
		// 	})
		// 	.catch((error) => {
		// 		console.log(error);
		// 	});
	}
}
