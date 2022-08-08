import { FirebaseApp } from 'firebase/app';
import {
	FirebaseStorage as _FirebaseStorage,
	getDownloadURL,
	getStorage,
	ref,
	StorageReference,
	uploadBytes,
	UploadResult,
} from 'firebase/storage';

export class FirebaseStorage {
	private storage: _FirebaseStorage;
	private storageRef: StorageReference | null;

	constructor(app: FirebaseApp) {
		this.storage = getStorage(app);
		this.storageRef = ref(this.storage, '');
	}

	setStorageRef(url: string): StorageReference {
		return ref(this.storage, url);
	}

	async uploadFile(
		data: Blob | Uint8Array | ArrayBuffer,
		path: string
	): Promise<UploadResult> {
		const ref = this.setStorageRef(path);
		return uploadBytes(ref, data);
	}

	async getFileFromPath(path: string): Promise<string> {
		const ref = this.setStorageRef(path);
		return getDownloadURL(ref);
	}

	async getFileUrl(ref: StorageReference): Promise<string> {
		return getDownloadURL(ref);
	}
}
