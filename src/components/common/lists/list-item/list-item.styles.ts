import styled from 'styled-components';

export interface ListItemProps {
	columns?: number;
	width?: string;
}

export const ListItem = styled.li<ListItemProps>`
	display: grid;

	width: 100%;
	height: 60px;

	grid-template-columns: 1fr repeat(
			${({ columns }) => (columns ? columns : 2)},
			${({ width }) => (width ? width : '100px')}
		);

	border: 1px solid ${({ theme }) => theme.border};
	border-radius: 0.5rem;

	place-content: center;
	place-items: center flex-start;

	padding: 4px;
	grid-gap: 20px;
`;
