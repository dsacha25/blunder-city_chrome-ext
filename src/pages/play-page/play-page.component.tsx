import React, { useEffect, useState } from 'react';
import { find } from 'lodash';
import MobileGameLayout from '../../components/games/game-play/layout/mobile-game-layout/mobile-game-layout.component';
import useActions from '../../hooks/use-actions/use-actions.hook';
import useQuery from '../../hooks/use-query/use-query.hook';
import { selectActiveGame } from '../../redux/game/game.selector';
import { selectUserUID } from '../../redux/users/user.selector';
import { PlayContainer } from './play-page.styles';
import useSelector from '../../hooks/use-selector/use-selector.hook';
import WaitingForOpponentMsg from '../../components/games/game-play/waiting-for-opponent-msg/waiting-for-opponent-msg.component';
import { RootState } from '../../redux/root-reducer';
import { connect } from 'react-redux';
import { ChessGameType } from '../../utils/types/chess/chess-game-type/chess-game-type';
import CustomButton from '../../components/common/buttons/custom-button/custom-button.component';
import GameToolbar from '../../components/games/game-play/game-toolbar/game-toolbar.component';

const PlayPage = (props: {
	activeGame: ChessGameType | null;
	uid?: string;
}) => {
	const { activeGame, uid } = props;
	const {
		openActiveGameListener,
		// openEnemyInfoListener,
		// closeEnemyInfoListener,
		// setUserGamePresence,
		closeActiveGameListener,
	} = useActions();
	const gameUID = useQuery('game');
	const [playersPresent, setPlayersPresent] = useState(false);

	useEffect(() => {
		if (gameUID) {
			// setUserGamePresence(true, gameUID);
		}

		return () => {
			// closeActiveGameListener();
			if (gameUID) {
				// setUserGamePresence(false, gameUID);
			}
		};
		// eslint-disable-next-line
	}, [gameUID]);

	// ==== FIREBASE PRESENCE STATE
	// useEffect(() => {
	// 	if (activeGame) {
	// 		setUserGamePresence(true, activeGame.id);
	// 	}

	// 	return () => {
	// 		if (!activeGame) return;
	// 		setUserGamePresence(false, activeGame.id);
	// 	};

	// 	// eslint-disable-next-line
	// }, []);

	// ==== LOCAL PRESENCE STATE
	useEffect(() => {
		if (!activeGame) return;
		if (
			activeGame.gameMode === 'untimed' ||
			activeGame.gameMode === 'one_day' ||
			activeGame.gameMode === 'three_day'
		) {
			return setPlayersPresent(true);
		}

		if (
			activeGame.blackPresent !== playersPresent ||
			activeGame.whitePresent !== playersPresent
		) {
			// console.log('PRESENCE BLACK: ', activeGame.blackPresent);
			// console.log('PRESENCE WHITE: ', activeGame.whitePresent);

			setPlayersPresent(activeGame.blackPresent && activeGame.whitePresent);
		}

		// eslint-disable-next-line
	}, [activeGame]);

	useEffect(() => {
		if (activeGame) {
			console.log('GAME EXISTS');
			openActiveGameListener();

			if (activeGame) {
				const enemyUID = find(activeGame.users, (player) => player !== uid);
				console.log('ENEMY UID: ', enemyUID);
				if (enemyUID) {
					// openEnemyInfoListener(enemyUID);
				}
			}
		}

		return () => {
			// closeEnemyInfoListener();
			// closeActiveGameListener();
		};

		// eslint-disable-next-line
	}, []);

	return (
		<PlayContainer>
			<MobileGameLayout />
			{!activeGame?.gameOver && (
				<WaitingForOpponentMsg playersPresent={playersPresent} />
			)}
			<GameToolbar />
		</PlayContainer>
	);
};

const mapStateToProps = ({ game, user }: RootState) => ({
	activeGame: game.activeGame,
	uid: user.auth?.uid,
});

export default connect(mapStateToProps)(PlayPage);
