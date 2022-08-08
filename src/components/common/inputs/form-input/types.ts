import React, { ComponentPropsWithRef } from 'react';
import { FieldError } from 'react-hook-form';

export type InputType = 'input' | 'textarea';

export type FormInputProps<T extends React.ElementType> =
	ComponentPropsWithRef<T> & {
		label?: string;
		error?: FieldError | string;
		noClick?: boolean;
		margin?: string;
		hasData?: boolean;
		inputType?: InputType;
	};
