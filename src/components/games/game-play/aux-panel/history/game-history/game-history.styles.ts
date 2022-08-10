import styled from 'styled-components';

export const GameHistoryContainer = styled.div`
	display: grid;
	grid-template-rows: 1fr 50px;
	height: 100%;
	width: 100%;
	place-self: center;
	margin: 0;
	padding: 0;
	font-size: 12px;

	place-items: center;
	overflow: hidden;
`;

export const HistoryMoveList = styled.div`
	height: -webkit-fill-available;
	max-height: 60vh;
	width: 90%;
	place-self: flex-start center;
	margin: 10px;
	padding: 0;
	font-size: 12px;

	overflow-y: auto;
`;

export const HistoryMove = styled.li`
	display: grid;
	width: 100%;
	height: 28px;
	grid-template-columns: 40px 1fr 1fr;

	margin: 6px 0;
	border: 1px solid grey;
	border-radius: 14px;
	padding: 3px;
	place-items: center;
	place-content: center;

	background-color: white;
`;

export const MoveNumber = styled.p`
	font-weight: 600;
`;

export const WhiteMove = styled.p`
	font-weight: 600;
	border-left: 1px solid grey;
	width: 100%;
	padding-left: 5px;
`;

export const BlackMove = styled.p`
	font-weight: 600;
	border-left: 1px solid grey;
	width: 100%;
	padding-left: 5px;
`;
