import { UseFormRegister } from 'react-hook-form';

export interface SearchInputProps {
	onSubmit: () => Promise<void>;
	label: string;
	register: UseFormRegister<any>;
	name: string;
	hasData: boolean;
}
