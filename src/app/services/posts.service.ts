import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ToastrService } from 'ngx-toastr';

@Injectable({
	providedIn: 'root',
})
export class PostsService {
	constructor(
		private storage: AngularFireStorage,
		private afs: AngularFirestore,
		private toastr: ToastrService,
	) {}

	uploadImage(selectedImage: any, postData: any) {
		//define a file path
		const filePath = `postIMG/${Date.now()}`;
		console.log(filePath);
		this.storage.upload(filePath, selectedImage).then(() => {
			console.log('Uploaded Successfully');

			this.storage
				.ref(filePath)
				.getDownloadURL()
				.subscribe((URL) => {
					postData.postImgPath = URL;
					console.log(postData);
					this.saveData(postData);
				});
		});
	}

	saveData(postData: any) {
		this.afs
			.collection('posts')
			.add(postData)
			.then((docRef) => {
				console.log(docRef);
				this.toastr.success('Post added succesfully!');
			});
	}
}
