import { Component } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Import AngularFirestore
import { provideFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
@Component({
	selector: 'app-categories',
	templateUrl: './categories.component.html',
	styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
	constructor(private afs: AngularFirestore) {}

	// Submit Form Handler
	onSubmit(formData: any) {
		let categoryData = {
			category: formData.value.category,
		};
		let subCategoryData = {
			subcategory: 'subCategory1',
		};
		this.afs
			.collection('categories')
			.add(categoryData)
			.then((docRef) => {
				console.log('Category added with ID:', docRef);

				//path method
				// this.afs.doc(`categories/${docRef.id}`).collection('subcategory').add(subCategoryData)

				this.afs
					.collection('categories')
					.doc(docRef.id)
					.collection('subcategory')
					.add(subCategoryData)
					.then((docRef1) => {
						console.log(docRef1);

						//path method

						// this.afs.doc(`categories/${docRef.id}/subcategory/${docRef1.id}`).collection('subsubcategory').add(subCategoryData)

						this.afs
							.collection('categories')
							.doc(docRef.id)
							.collection('subcategory')
							.doc(docRef1.id)
							.collection('subsubcategory')
							.add(subCategoryData)
							.then((docRef2) => {
								console.log('subsubcaterogy added successfully', docRef2);
							});
					});
			})
			.catch((error) => {
				console.log(error);
			});
	}
}
