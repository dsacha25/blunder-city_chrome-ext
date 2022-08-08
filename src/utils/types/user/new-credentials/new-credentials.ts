import { Credentials } from '../credentials/credentials';
import { BaseImage } from '../../util/base-image/base-image';

export interface NewCredentials extends Credentials {
	displayName: string;
	confirmPassword: string;
	photoURL?: BaseImage;
}
