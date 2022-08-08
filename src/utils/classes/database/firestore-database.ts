import { Observer } from '@firebase/util';
import { FirebaseApp } from 'firebase/app';
import {
	collection,
	CollectionReference,
	Firestore,
	getDocs,
	getDoc,
	deleteDoc,
	updateDoc,
	setDoc,
	doc,
	query,
	getFirestore,
	QueryDocumentSnapshot,
	DocumentSnapshot,
	DocumentData,
	QueryConstraint,
	QuerySnapshot,
	UpdateData,
	onSnapshot,
	Unsubscribe,
	DocumentReference,
	startAt,
	endAt,
	limit,
	orderBy,
} from 'firebase/firestore';
import { Database } from './database';

export type Doc = DocumentSnapshot<DocumentData>;

export class FirestoreDatabase implements Database {
	private db: Firestore;
	private collection: CollectionReference<any>;

	constructor(collectionName: string, app: FirebaseApp) {
		this.db = getFirestore(app);
		this.collection = this.getCollection<DocumentData>(collectionName);
	}

	convertSnapshot<T>(snapshot: QuerySnapshot<T>, includeId?: boolean): T[] {
		if (includeId) {
			return snapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));
		} else {
			return snapshot.docs.map((doc) => ({
				...doc.data(),
			}));
		}
	}

	convertDocSnapshot<T>(snapshot: DocumentSnapshot<T>): T | undefined {
		if (snapshot.exists()) {
			return { ...snapshot.data(), id: snapshot.id };
		}
	}

	getCollection = <T>(collectionName: string): CollectionReference<T> => {
		return collection(this.db, collectionName).withConverter<T>({
			toFirestore: (data: T) => {
				return data;
			},
			fromFirestore: (snap: QueryDocumentSnapshot<T>) => {
				return snap.data() as T;
			},
		});
	};

	setCollection = <T>(collectionName: string): void => {
		this.collection = this.getCollection<T>(collectionName);
	};

	// Fetch all documents within specified collection
	getAll = async <T>(
		collectionName: string,
		...queryContstraints: QueryConstraint[]
	): Promise<T[]> => {
		this.setCollection(collectionName);
		let pendingQuery = query<T>(this.collection, ...queryContstraints);

		const snapshot = await getDocs(pendingQuery).catch((err) => {
			console.log('Firebase Error: ', err, ' Name: ', collectionName);
			return err;
		});

		return this.convertSnapshot<T>(snapshot);
	};

	getAllWithID = async <T>(
		collectionName: string,
		...queryContstraints: QueryConstraint[]
	): Promise<T[]> => {
		this.setCollection(collectionName);
		let pendingQuery = query<T>(this.collection, ...queryContstraints);

		const snapshot = await getDocs(pendingQuery).catch((err) => {
			console.log('Firebase Error: ', err, ' Name: ', collectionName);
			return err;
		});

		return this.convertSnapshot<T>(snapshot, true);
	};

	getAllPaginated = async <T>(
		collectionName: string,
		...queryContstraints: QueryConstraint[]
	) => {
		this.setCollection(collectionName);
		let pendingQuery = query<T>(this.collection, ...queryContstraints);

		const snapshot = await getDocs<T>(pendingQuery).catch((err) => {
			console.log('Firebase Error: ', err);
			return err;
		});

		const docs = snapshot.docs;

		const startRef = docs[0].ref;
		const endRef = docs[docs.length - 1].ref;
		const data = this.convertSnapshot<T>(snapshot);
		return { data, startRef, endRef };
	};

	get = async <T>(
		collectionName: string,
		id: string
	): Promise<T | undefined> => {
		const collectionRef = this.getCollection<T>(collectionName);
		const docRef = doc<T>(collectionRef, id);
		const snapshot = await getDoc<T>(docRef).catch((err) => {
			console.error(err);
			return err;
		});
		return await this.convertDocSnapshot<T>(snapshot);
	};

	getDocumentReference = <T>(documentPath: string): DocumentReference<T> => {
		return doc(this.db, documentPath) as DocumentReference<T>;
	};

	create = async <T>(
		collectionPath: string,
		id: string,
		item: T
	): Promise<void | string> => {
		const collectionRef = this.getCollection<T>(collectionPath);
		const docRef = doc(collectionRef, id);
		const error = await setDoc(docRef, item).catch((err) => {
			console.error(err);
			return err;
		});

		if (error) {
			return error;
		}
	};

	update = async (
		collectionName: string,
		id: string,
		item: UpdateData<any>
	): Promise<void | string> => {
		const collectionRef = this.getCollection(collectionName);
		// TODO: is setting collection necessary?
		this.setCollection(collectionName);
		const docRef = doc(collectionRef, id);
		const error = await updateDoc(docRef, item).catch((err) => {
			console.error(err);
			return err;
		});

		if (error) {
			return error;
		}
	};

	delete = async (collectionName: string, id: string): Promise<void> => {
		const collectionRef = this.getCollection(collectionName);
		const docRef = doc(collectionRef, id);
		return await deleteDoc(docRef)
			.then(() => {
				console.log(`Document ${id} deleted`);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	openDocumentListener = <T>(
		collectionName: string,
		id: string,
		observer: Observer<DocumentSnapshot<T>>
	): Unsubscribe => {
		const collectionRef = this.getCollection<T>(collectionName);
		const documentRef = doc<T>(collectionRef, id);

		return onSnapshot<T>(documentRef, observer);
	};

	openCollectionListener = <T>(
		collectionName: string,
		queryContstraints: QueryConstraint[],
		observer: Observer<QuerySnapshot<T>>
	): Unsubscribe => {
		const collectionRef = this.getCollection<T>(collectionName);
		let pendingQuery = query<T>(collectionRef, ...queryContstraints);

		return onSnapshot<T>(pendingQuery, observer);
	};

	searchCollection = async <T>(
		searchQuery: string,
		collectionName: string,
		_orderBy?: string
	): Promise<T[]> => {
		if (_orderBy) {
			return this.getAll<T>(
				collectionName,
				orderBy(_orderBy),
				startAt(searchQuery),
				endAt(searchQuery + '\uf8ff'),
				limit(10)
			);
		} else {
			return this.getAll<T>(
				collectionName,
				startAt(searchQuery),
				endAt(searchQuery + '\uf8ff'),
				limit(10)
			);
		}
	};
}
