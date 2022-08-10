import styled from 'styled-components';

interface BoardProps {
	size: number;
}

export const BoardContainer = styled.div<BoardProps>`
	display: grid;
	position: relative;
	place-items: center;
	justify-self: center;
	grid-gap: 5px;

	grid-template-rows: auto ${({ size }) => size}px auto;

	@media screen and (max-width: 980px) {
		justify-self: flex-start;
		overflow: hidden;
	}
`;

export const OpponentContainer = styled.div`
	display: grid;
	width: 100%;
	height: 60px;
	place-items: flex-end flex-start;
	place-self: flex-end;
`;

export const PlayerContainer = styled.div`
	display: grid;
	width: 100%;
	height: 60px;
	place-items: flex-start flex-end;
	place-self: flex-start;
`;
