import { User } from 'firebase/auth';
import {
	DocumentReference,
	onSnapshot,
	query,
	QueryConstraint,
} from 'firebase/firestore';
import { END, EventChannel, eventChannel } from 'redux-saga';
// import { call, fork, take, takeLatest } from 'typed-redux-saga/macro';
import {
	call,
	fork,
	take,
	takeLatest,
	CallEffect,
	ChannelTakeEffect,
	ForkEffect,
	TakeEffect,
} from 'redux-saga/effects';
import { auth, db } from '../firestore/firestore-app';

export class SagaListener {
	*closeListener<T>(channel: EventChannel<T>) {
		yield channel.close();
	}

	*onListenerClose<T>(channel: EventChannel<T>, ACTION: string) {
		yield takeLatest(ACTION, this.closeListener, channel);
	}

	*setListener<T>(
		channel: EventChannel<T>,
		callback: (args?: any) => any
	): Generator<ChannelTakeEffect<T>> | CallEffect<T> | TakeEffect {
		try {
			while (true) {
				const channelProps = yield take(channel);

				if (channelProps) {
					yield call(callback, channelProps);
				}
			}
		} catch (err) {
			yield console.error('Set Listener Error: ', err);
			yield channel.close();
		}
	}

	*initializeListener<T>(
		listener: () => EventChannel<T>,
		callback: (args?: any) => any
	): Generator<ForkEffect> | CallEffect<EventChannel<T>> {
		const channel: EventChannel<T> = yield call(listener);
		yield fork(this.setListener, channel, callback);
	}

	initializeChannel = <T>(
		channel: EventChannel<T>,
		callback: (args?: any) => any
	) => {
		return fork(this.setListener, channel, callback);
	};

	generateDocumentListener<T>(
		query: DocumentReference<T>,
		includeId?: boolean
	): EventChannel<T> {
		return eventChannel((emitter) => {
			const unsubscribe = onSnapshot(query, (snapshot) => {
				if (snapshot.exists()) {
					if (includeId) {
						return emitter({ ...snapshot.data(), id: snapshot.id });
					} else {
						return emitter({ ...snapshot.data() });
					}
				} else {
					console.log('END LISTENER');
					emitter(END);
				}
			});

			return unsubscribe;
		});
	}

	generateCollectionListener = <T>(
		collectionName: string,
		...constraints: QueryConstraint[]
	): EventChannel<unknown> => {
		const collectionRef = db.getCollection<T>(collectionName);
		return eventChannel<any>((emitter) => {
			const unsubscribe = onSnapshot(
				query<T>(collectionRef, ...constraints),
				(snapshot) => {
					if (!snapshot.empty) {
						emitter(
							snapshot.docs.map((doc) => ({
								...doc.data(),
								id: doc.id,
							}))
						);
					} else {
						emitter([]);
					}
				}
			);

			return unsubscribe;
		});
	};

	generateAuthListener(): EventChannel<User> {
		return eventChannel((emitter) => {
			const unsubscribe = auth.onAuthChange((user) => {
				if (user) {
					emitter(user);
				} else {
					emitter(END);
				}
			});

			return unsubscribe;
		});
	}
}

export const listener = new SagaListener();
