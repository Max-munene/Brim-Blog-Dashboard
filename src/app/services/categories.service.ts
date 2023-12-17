import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Import
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
AngularFirestore;

@Injectable({
	providedIn: 'root',
})
export class CategoriesService {
	constructor(private afs: AngularFirestore, private toastr: ToastrService) {}

	saveData(data: any) {
		this.afs
			.collection('categories')
			.add(data)
			.then((docRef) => {
				console.log(docRef);
				this.toastr.success('Category saved successfully!');
			})
			//path method
			// this.afs.doc(`categories/${docRef.id}`).collection('subcategory').add(subCategoryData)

			.catch((error) => {
				console.log(error);
			});
	}

	loadData() {
		return this.afs
			.collection('categories')
			.snapshotChanges()
			.pipe(
				map((actions) => {
					return actions.map((a) => {
						const data = a.payload.doc.data();
						const id = a.payload.doc.id;

						return { id, data };
					});
				}),
			);
	}

	updateData(id: any, EditData: any) {
		this.afs

			.doc(`categories/${id}`)
			.update(EditData)
			.then((docRef) => {
				console.log(docRef);
				this.toastr.success('Data updated successfully!');
			});
	}

	deleteData(id: any) {
		this.afs
			.doc(`categories/${id}`)

			.delete()
			.then((docRef) => {
				console.log(docRef);
				this.toastr.success('Category deleted!');
			});
	}
}
