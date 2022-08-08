import styled from 'styled-components';

export const HomePageContainer = styled.div`
	display: grid;
	width: 100vw;
	height: 100vh;

	place-items: center;
	place-content: center;
	place-self: center;

	grid-template-rows: repeat(3, auto);
	gap: 30px;
	padding: 30px;
`;

export const HomeIconWrapper = styled.div`
	display: grid;
	place-items: center;
	border-radius: 100%;
	border: 7px solid #6b001d;
	width: 100%;
	max-width: 300px;
	height: 300px;
	overflow: hidden;
`;
