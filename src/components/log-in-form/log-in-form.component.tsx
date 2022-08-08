import React from 'react';
import useActions from '../../hooks/use-actions/use-actions.hook';
import { LogInButton, LogInFormContainer } from './log-in-form.styles';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Credentials } from '../../utils/types/user/credentials/credentials';
import FormInput from '../common/inputs/form-input/form-input.component';

const LogInForm = () => {
	const { logInUserStart } = useActions();

	const {
		register,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm<Credentials>();

	const onSubmit: SubmitHandler<Credentials> = (data) => {
		logInUserStart(data);
	};

	return (
		<LogInFormContainer onSubmit={handleSubmit(onSubmit)}>
			<FormInput
				{...register('email', { required: true })}
				label="Email"
				hasData={!!watch('email')}
				error={errors.email}
				autoFocus
			/>
			<FormInput
				{...register('password', { required: true })}
				label="Password"
				type="password"
				hasData={!!watch('password')}
				error={errors.password}
			/>
			<LogInButton color="main">Log In</LogInButton>
		</LogInFormContainer>
	);
};

export default LogInForm;
