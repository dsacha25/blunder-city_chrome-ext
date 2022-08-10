import styled from 'styled-components';

export const PlayContainer = styled.div`
	display: grid;
	width: 100vw;
	max-width: 600px;
	height: 100vh;
	max-height: 600px;

	grid-template-columns: 1fr 160px;

	position: relative;
	place-items: center;
`;
