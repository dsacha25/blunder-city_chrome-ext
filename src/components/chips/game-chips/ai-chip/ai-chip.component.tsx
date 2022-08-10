import React, { FC } from 'react';
import {
	AiAvatar,
	ChipContainer,
	PlayerInfo,
	PlayerName,
	PlayerRating,
} from '../game-chip-styles/game-chip-styles.styles';
import { AiChipProps } from './types';
import { BsCpuFill } from 'react-icons/bs';

const AiChip: FC<AiChipProps> = ({ aiLevel }) =>
	aiLevel ? (
		<ChipContainer opponent>
			<AiAvatar opponent>
				<BsCpuFill color="white" size="30px" />
			</AiAvatar>
			<PlayerInfo opponent>
				<PlayerName>AI Level</PlayerName>
				<PlayerRating>{aiLevel + 1}</PlayerRating>
			</PlayerInfo>
		</ChipContainer>
	) : null;

export default AiChip;
