import React, { forwardRef } from 'react';
import {
	FormInputComponent,
	FormInputTextAreaComponent,
	FormInputWrapper,
	InputLabel,
} from './form-input.styles';
import { FormInputProps } from './types';

export const FormInput = forwardRef<HTMLInputElement, FormInputProps<'input'>>(
	(props, ref) => {
		return (
			<FormInputWrapper className={props.className} margin={props.margin}>
				<FormInputComponent ref={ref} {...props} />
				{props.label && (
					<InputLabel className={props.hasData ? 'shrink' : ''}>
						{props.label}
					</InputLabel>
				)}
			</FormInputWrapper>
		);
	}
);

export const FormInputTextArea = forwardRef<
	HTMLTextAreaElement,
	FormInputProps<'textarea'>
>((props, ref) => {
	return (
		<FormInputWrapper className={props.className} margin={props.margin}>
			<FormInputTextAreaComponent ref={ref} {...props} />
			{props.label && (
				<InputLabel className={props.hasData ? 'shrink' : ''}>
					{props.label}
				</InputLabel>
			)}
		</FormInputWrapper>
	);
});

export default FormInput;
