import { FirebaseApp } from 'firebase/app';
import {
	Database,
	getDatabase,
	ref,
	set,
	onDisconnect,
	onValue,
} from 'firebase/database';

export class RealTimeDatabase {
	private rt: Database;

	constructor(app: FirebaseApp) {
		this.rt = getDatabase(app);
	}

	async writeData(path: string, data: any): Promise<void> {
		const dataRef = ref(this.rt, path);

		return set(dataRef, data);
	}

	async read(path: string) {
		ref(this.rt, path);
	}

	getRef(path: string) {
		return ref(this.rt, path);
	}

	async readValue<T>(path: string, callback: (val: T) => void) {
		return onValue(this.getRef(path), (snapshot) => {
			return callback(snapshot.val());
		});
	}

	async disconnect(path: string, value: unknown): Promise<void> {
		await onDisconnect(this.getRef(path)).set(value);
	}
}
