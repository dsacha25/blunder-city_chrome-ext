import styled from 'styled-components';

export const List = styled.ul`
	display: grid;
	width: 100%;
	max-width: 50vw;
	height: 100%;

	place-content: flex-start stretch;

	grid-gap: 10px;

	margin: 10px;
	padding: 0;

	@media screen and (max-width: 980px) {
		width: 94%;
		max-width: unset;
	}
`;
