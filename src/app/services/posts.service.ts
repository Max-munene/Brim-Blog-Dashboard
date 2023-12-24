import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
	providedIn: 'root',
})
export class PostsService {
	constructor(private afs: AngularFireStorage) {}

	uploadImage(selectedImage: any) {
		//define a file path
		const filePath = `postIMG/${Date.now()}`;
		console.log(filePath);
	}
}
