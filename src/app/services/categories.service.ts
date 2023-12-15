import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Import AngularFirestore

@Injectable({
	providedIn: 'root',
})
export class CategoriesService {
	constructor(private afs: AngularFirestore) {}

	saveData(data: any) {
		this.afs
			.collection('categories')
			.add(data)
			.then((docRef) => {
				console.log(docRef);
			})
			//path method
			// this.afs.doc(`categories/${docRef.id}`).collection('subcategory').add(subCategoryData)

			.catch((error) => {
				console.log(error);
			});
	}
}
