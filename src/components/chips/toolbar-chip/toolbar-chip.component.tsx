import React, { useEffect, useState } from 'react';
import useSelector from '../../../hooks/use-selector/use-selector.hook';
import {
	selectChessUser,
	selectProfilePicture,
} from '../../../redux/users/user.selector';
import { AvatarChip } from '../avatar-chip/avatar-chip.styles';
import {
	ChipInfoContianer,
	Rating,
	ToolbarChipContainer,
	UserName,
} from './toolbar-chip.styles';

const ToolbarChip = () => {
	const photoURL = useSelector((state) => selectProfilePicture(state));
	const chessUser = useSelector((state) => selectChessUser(state));

	const [name, setName] = useState('');

	useEffect(() => {
		if (chessUser && chessUser.displayName) {
			setName(chessUser.displayName);
		}
	}, [chessUser]);

	return (
		<ToolbarChipContainer>
			<AvatarChip url={photoURL} />
			<ChipInfoContianer>
				<UserName>{name}</UserName>
				<Rating>{chessUser?.rating}</Rating>
			</ChipInfoContianer>
		</ToolbarChipContainer>
	);
};

export default ToolbarChip;
