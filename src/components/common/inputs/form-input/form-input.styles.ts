import styled, { css } from 'styled-components';
import { FormInputProps } from './types';

const secondary = '#b6babd';

const labelStyles = css`
	display: unset;
	align-items: unset;
	top: -22px;
	font-size: 14px;
	font-weight: 800;
	color: ${({ theme }) => theme.secondary};
	text-transform: uppercase;
	letter-spacing: -0.05rem;
`;

const FormInputBase = css`
	color: ${({ theme }) => theme.main};

	border-radius: 0.5rem;
	border: 1px solid ${secondary};
	padding: 10px 15px;
	max-width: -webkit-fill-available;
	font-family: 'Lexend Peta', sans-serif;
	font-size: 16px;
	font-weight: 400;
	font-style: italic;
	letter-spacing: 0.15rem;
	line-height: 2rem;
	cursor: pointer;

	:focus {
		outline: none;
		background-color: #fff;
		border-color: #80bdff;
		box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
	}

	:focus ~ label {
		${labelStyles}
	}

	:disabled {
		background: #44444422;
		border-bottom: unset;
		cursor: unset;
	}

	::placeholder {
		color: ${({ theme }) => theme.main};
		font-size: 1rem;
	}

	::-webkit-calendar-picker-indicator {
		cursor: pointer;
	}

	@media screen and (max-width: 980px) {
		font-size: 16px;
		letter-spacing: 0.1rem;
	}
`;

const errorStyles = css`
	background-color: #ffe9e9 !important;
	border-color: #ff3636 !important;
	outline: 0;
	box-shadow: 0 0 0 0.2rem rgba(255, 0, 0, 0.4) !important;
`;

export const FormInputWrapper = styled.div<FormInputProps<any>>`
	display: inline;
	position: relative;
	flex: 1;
	width: 100%;
	margin: ${({ margin }) => margin};

	input[type='password'] {
		letter-spacing: 0.3rem;
	}
`;

export const FormInputComponent = styled.input<FormInputProps<'input'>>`
	display: block;
	width: 100%;
	height: 100%;

	pointer-events: ${({ noClick }) => noClick && 'none'};

	${({ error }) => error && errorStyles}

	${FormInputBase};
`;

export const FormInputTextAreaComponent = styled.textarea<
	FormInputProps<'textarea'>
>`
	display: block;
	width: 100%;
	height: 100%;

	pointer-events: ${({ noClick }) => noClick && 'none'};

	resize: vertical;
	min-height: 100px;

	${({ error }) => error && errorStyles}

	${FormInputBase};
`;

export const InputLabel = styled.label`
	display: flex;
	align-items: center;
	color: ${({ theme }) => theme.main};
	font-size: 1rem;
	font-weight: 200;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 10px;
	font-style: italic;
	letter-spacing: 0.1rem;
	pointer-events: none;
	transition: 300ms ease all;
	font-family: 'Lexend Peta', sans-serif;

	&.shrink {
		${labelStyles}
	}

	@media screen and (max-width: 1400px) {
		font-size: 1rem;
		letter-spacing: unset;
	}

	@media screen and (max-width: 980px) {
		font-size: 16px;
		letter-spacing: unset;
		font-weight: 300;
	}
`;
