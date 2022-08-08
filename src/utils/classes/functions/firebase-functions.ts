import { FirebaseApp } from 'firebase/app';
import { Functions, getFunctions, httpsCallable } from 'firebase/functions';

class FirebaseFunctions {
	private functions: Functions;

	constructor(app: FirebaseApp) {
		this.functions = getFunctions(app);
	}

	callFirebaseFunction = async <T, K>(name: string, data?: T) => {
		const callable = httpsCallable<T, K>(this.functions, name);
		return await callable(data)
			.then((response) => {
				console.log('Function succesffuly called');
				let data = response.data;
				if (data) {
					return data;
				}
			})
			.catch((error) => {
				console.log('Function call unsuccessful');
				return error;
			});
	};
}

export default FirebaseFunctions;
