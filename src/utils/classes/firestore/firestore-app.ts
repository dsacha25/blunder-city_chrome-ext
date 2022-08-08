import firebase, { FirebaseApp, initializeApp } from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/functions';
import 'firebase/storage';
import { FirestoreDatabase } from '../database/firestore-database';
import { FirebaseAuth } from '../auth/firebase-auth';
import FirebaseFunctions from '../functions/firebase-functions';
import { FirebaseStorage } from '../storage/firebase-storage';
import { RealTimeDatabase } from '../real-time/real-time';

const firebaseConfig = {
	apiKey: 'AIzaSyAIu_0OHjiUObOZJj2YE4didA65vUgA-JU',
	authDomain: 'chess-project-ts.firebaseapp.com',
	projectId: 'chess-project-ts',
	storageBucket: 'chess-project-ts.appspot.com',
	messagingSenderId: '843781004415',
	appId: '1:843781004415:web:2312ca4533b9c27dd3f34a',
	measurementId: 'G-F5W74SB73D',
};

export class FirestoreApp {
	public app: firebase.FirebaseApp;
	public auth: FirebaseAuth;
	public db: FirestoreDatabase;
	public functions: FirebaseFunctions;
	public storage: FirebaseStorage;
	public rt: RealTimeDatabase;

	constructor(app: FirebaseApp) {
		this.app = app;
		this.auth = new FirebaseAuth(app);
		this.db = new FirestoreDatabase('*', app);
		this.functions = new FirebaseFunctions(app);
		this.storage = new FirebaseStorage(app);
		this.rt = new RealTimeDatabase(app);
	}
}

export const firestore = new FirestoreApp(initializeApp(firebaseConfig));

export const app = firestore.app;
export const auth = firestore.auth;
export const db = firestore.db;
export const functions = firestore.functions;
export const storage = firestore.storage;
export const rt = firestore.rt;
