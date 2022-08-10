import React, { memo, useEffect, useMemo, useState } from 'react';
import { milliseconds, toDate } from 'date-fns';
import useActions from '../../../../hooks/use-actions/use-actions.hook';

import parseGameTime from '../../../../utils/helpers/parsers/parse-game-time/parse-game-time';
import { OnlineStatusIndicator } from '../../../common/online-status-indicator/online-status-indicator.styles';

import CountdownTimer from '../../../common/countdown-timer/countdown-timer.component';

import { CountdownTimeDelta } from 'react-countdown';
import {
	ChipAvatar,
	ChipContainer,
	PlayerInfo,
	PlayerName,
	PlayerRating,
} from '../game-chip-styles/game-chip-styles.styles';
import parseCurrentPlayer from '../../../../utils/helpers/parsers/parse-current-player/parse-current-player';
import parseTimeUnit from '../../../../utils/helpers/parsers/parse-time-unit/parse-time-unit';
import isPresenceRequired from '../../../../utils/helpers/game/is-presence-required/is-presence-required';
import { Timestamp } from 'firebase/firestore';
import { ChessUser } from '../../../../utils/types/user/chess-user/chess-user';
import { RootState } from '../../../../redux/root-reducer';
import { connect } from 'react-redux';
import { ChessGameType } from '../../../../utils/types/chess/chess-game-type/chess-game-type';
import Orientation from '../../../../utils/types/chess/orientation/orientation';

const Name = memo(PlayerName);
const Rating = memo(PlayerRating);
const OnlineStatus = memo(OnlineStatusIndicator);

const OpponentChip = (props: {
	game: ChessGameType | null;
	opponent: ChessUser | null;
	turn?: Orientation;
}) => {
	const { game, turn, opponent } = props;
	// const { setActiveGameTime } = useActions();
	// const enemy = useSelector((state) => selectEnemyInfo(state));
	const enemy: ChessUser = useMemo(
		() => ({
			online: true,
			photoURL: '',
			displayName: 'Dick Fart',
			email: '',
			draws: 0,
			losses: 0,
			wins: 0,
			phoneNumber: '5555550',
			providerId: '',
			uid: '',
			totalOppRatings: 0,
		}),
		[]
	);

	const [side, setSide] = useState('white');
	const [paused, setPaused] = useState(false);
	const [time, setTime] = useState(Date.now());

	useEffect(() => {
		if (game && opponent) {
			const { previousMoveTime } = parseCurrentPlayer(opponent.uid, game, true);

			if (!isPresenceRequired(game.gameMode)) return;

			console.log('PREVIOUS MOVE TIME: ', previousMoveTime);

			if (previousMoveTime instanceof Timestamp) {
				console.log('SET OPPONENT TIME FROM PREVIOUS MOVE');
				setTime(previousMoveTime.toDate().getTime() + parseTimeUnit(game));
				console.log('PREVIOUS MOVE:', previousMoveTime.toDate().getTime());
			} else if (game.createdAt && !previousMoveTime) {
				console.log('SET OPPONENT TIME FROM CREATED AT');

				setTime(
					toDate(game.createdAt.seconds * 1000).getTime() + parseTimeUnit(game)
				);
			}
		}
	}, [game, opponent]);

	useEffect(() => {
		if (
			game &&
			opponent &&
			side === turn &&
			!isPresenceRequired(game.gameMode)
		) {
			console.log(
				'SET TIME FROM OPPONENT: ',
				Date.now() + milliseconds(parseGameTime(opponent.uid, game) || {})
			);

			setTime(
				Date.now() + milliseconds(parseGameTime(opponent.uid, game) || {})
			);
		}
	}, [game, opponent, turn, side]);

	useEffect(() => {
		if (!game) return;
		if (side !== game.turn) {
			console.log('OPP PAUSE', side);
			setPaused(true);
		} else {
			console.log('OPP START', side);
			setPaused(false);
		}
	}, [side, game]);

	useEffect(() => {
		if (!game) return;

		if (!isPresenceRequired(game.gameMode)) return;

		if (!game.blackPresent || !game.whitePresent) {
			setPaused(true);
		} else {
			setPaused(false);
		}
	}, [game]);

	useEffect(() => {
		if (game && opponent) {
			console.log('BLACK UID: ', game.black.uid);
			console.log('ENEMY UID: ', opponent.uid);
			console.log('BLACK UID === ENEMY UID: ', game.black.uid === opponent.uid);
			setSide(game.black.uid === opponent.uid ? 'black' : 'white');
			console.log('OPP SIDE: ', side);
		}

		// eslint-disable-next-line
	}, []);

	const handleTime = (time: CountdownTimeDelta) => {
		console.log('OPP TIME: ', time);

		if (time.completed) {
			// AUTO RESIGN GAME
		}
		if (opponent && game) {
			console.log('TURN ', game.turn);
			console.log('OPP SIDE', side);
			// return opponent.uid === game.black.uid
			// 	? setActiveGameTime(time, 'black')
			// 	: setActiveGameTime(time, 'white');
		}
	};

	if (!opponent || !game) return null;
	return (
		<ChipContainer opponent>
			<ChipAvatar opponent url={opponent.photoURL}>
				<OnlineStatus online={opponent.online} left />
			</ChipAvatar>
			<PlayerInfo opponent>
				<Name>{opponent.displayName}</Name>
				<Rating>{opponent.rating}</Rating>
				<CountdownTimer
					date={time}
					getTime={handleTime}
					isPaused={paused}
					hidden={game.gameMode === 'untimed'}
				/>
			</PlayerInfo>
		</ChipContainer>
	);
};

const mapStateToProps = ({ game, enemy }: RootState) => ({
	game: game.activeGame,
	turn: game.activeGame?.turn,
	opponent: enemy.opponentInfo,
});

export default memo(connect(mapStateToProps)(OpponentChip));
