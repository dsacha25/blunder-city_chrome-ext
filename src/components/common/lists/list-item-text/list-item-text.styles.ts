import styled from 'styled-components';

export const ListItemText = styled.p`
	font-size: 20px;
	font-weight: 800;
	color: ${({ theme }) => theme.main} !important;
	margin-left: 10px;

	@media screen and (max-width: 980px) {
		white-space: nowrap;
		font-size: 16px;
		overflow-x: auto;
	}
`;
