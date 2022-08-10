import { User } from 'firebase/auth';
import { onSnapshot, query, QueryConstraint } from 'firebase/firestore';
import { END, EventChannel, eventChannel } from 'redux-saga';
// import { call, fork, take, takeLatest } from 'typed-redux-saga/macro';
import {
	call,
	fork,
	take,
	takeLatest,
	CallEffect,
	ChannelTakeEffect,
	TakeEffect,
} from 'redux-saga/effects';
import { auth, db } from '../firestore/firestore-app';

/**
 * @class `SagaListener` is used to streamline process of generating *Firebase* realtime `listeners` using Redux Saga
 *
 * @method onListenerClose closes the `listener` when *param* `ACTION` is `dispatched`
 *
 * @method setListener maps `props` received from `channel` *param* to the provided `callback`
 *
 * @method generateDocListener creates an `EventChannel` listening to specified `documentPath`, optionally passes the document `id`, and returns `listener`
 *
 * @method generateCollectionListener creates an `EventChannel` listening to specified `collectionName` and returns `listener` receiving an `array` of docs
 *
 * @method generateAuthListener creates an `EventChannel` listening to `Firebase` auth `onAuthChange` method and returns `listener`
 *
 * @method initializeChannel final initialization of the `listener` - `forks` the `callback` with the provided `EventChannel`
 * @note `initializeChannel` *must* be called after `onListenerClose`
 *
 */

export class SagaListener {
	/**
	 * Closes the Saga `EventChannel` and unsubscribes from the listener
	 *
	 * @param channel the `EventChannel` object to be closed
	 * @param ACTION the dispatched `ACTION` to listen for
	 */
	public *onListenerClose<T>(channel: EventChannel<T>, ACTION: string) {
		yield takeLatest(ACTION, function* () {
			yield console.log('ACTION: ', ACTION);
			yield channel.close();
		});
	}

	/**
	 * Manages provided channel and maps `channelProps` to `callback`
	 *
	 * @param channel the `EventChannel` being listened to
	 * @param callback a `fn` that returns `args` received as props from the `channel`
	 */
	private *setListener<T>(
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

	/**
	 * Generates an `EventChannel` object that listens to a Firebase Document
	 *
	 * * Creates a *Firebase* `documentReference`
	 * * Models *saga* `EventChannel` around `documentReference` snapshot `listener`
	 *
	 * @param documentPath the name of the `Firebase` `document` we're listening to.
	 * @param includeId should the document `id` be mapped onto the `snapshot` object
	 * @return an `EventChannel` object listening to doc reference that can be used with the `initializeChannel` & `onListenerClose` methods
	 */
	public generateDocListener<T>(
		documentPath: string,
		includeId?: boolean
	): EventChannel<T> {
		const documentRef = db.getDocumentReference<T>(documentPath);

		return eventChannel((emitter) => {
			const unsubscribe = onSnapshot(documentRef, (snapshot) => {
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

	/**
	 * Generates an `EventChannel` object that listens to a Firebase Collection
	 *
	 * * Creates a *Firebase* `collectionReference`
	 * * Models *saga* `EventChannel` around `collectionReference` snapshot `listener`
	 *
	 * @param collectionName the name of the collection we're listening to
	 * @param constraints an optional array of `Firebase` query constraints
	 * @return an `EventChannel` object listening to `collection` that can be used with the `initializeChannel` & `onListenerClose` methods
	 */
	public generateCollectionListener = <T>(
		collectionName: string,
		...constraints: QueryConstraint[]
	): EventChannel<T[]> => {
		const collectionRef = db.getCollection<T>(collectionName);

		return eventChannel((emitter) => {
			const unsubscribe = onSnapshot(
				query<T>(collectionRef, ...constraints),
				(snapshot) => {
					if (!snapshot.empty) {
						emitter(
							snapshot.docs.map((doc) => ({
								...doc.data(),
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

	/**
	 * Generate an `EventChannel` object that listens to the *Firebase Auth* `onAuthChange` method
	 *
	 * @return an `EventChannel` object that can be used with the `initializeChannel` & `onListenerClose` methods
	 */
	public generateAuthListener(): EventChannel<User> {
		return eventChannel((emitter) => {
			const unsubscribe = auth.onAuthChange((user) => {
				if (user) {
					emitter(user);
				} else {
					emitter(END);
					unsubscribe();
				}
			});

			return unsubscribe;
		});
	}

	/**
	 * Final initialization of the `EventChannel`
	 *
	 * * Generates a *redux-saga* `fork` effect
	 *
	 * @param channel the `EventChannel` being listened to
	 * @param callback the `fn` that returns `props` received from `channel`
	 */
	public initializeChannel = <T>(
		channel: EventChannel<T>,
		callback: (args?: any) => any
	) => {
		return fork(this.setListener, channel, callback);
	};
}

export const listener = new SagaListener();
