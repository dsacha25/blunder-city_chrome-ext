import React, { useEffect, useState } from 'react';
import { add, differenceInMilliseconds, intervalToDuration } from 'date-fns';
import {
	GameInfoDisplayContainer,
	GameTime,
	TimerContainer,
} from './game-info-display.styles';
import durationToTime from '../../../../utils/helpers/strings/duration-to-time/duration-to-time';
import { selectActiveGame } from '../../../../redux/game/game.selector';
import useActions from '../../../../hooks/use-actions/use-actions.hook';
import { selectUserUID } from '../../../../redux/users/user.selector';
import useSelector from '../../../../hooks/use-selector/use-selector.hook';

const GameInfoDisplay = () => {
	const activeGame = useSelector((state) => selectActiveGame(state));
	const uid = useSelector((state) => selectUserUID(state));

	// const { setActiveGameTime } = useActions();

	const [time, setTime] = useState('00:00');
	const [end, setEnd] = useState(
		add(new Date(), { days: 0, minutes: 0, seconds: 0 })
	);
	const [difference, setDifference] = useState(0);
	const [paused, setPaused] = useState(false);

	useEffect(() => {
		if (activeGame) {
			// setEnd(add(new Date(), activeGame.gameTime));
		}
	}, []);

	useEffect(() => {
		// console.log('TIME: ', intervalToDuration({ start: new Date(), end }));

		let timeOut = setTimeout(() => {
			if (paused) return;
			let newStart = new Date().getMilliseconds() + 1000;

			const time = intervalToDuration({
				start: new Date().setMilliseconds(newStart),
				end,
			});

			console.log('GAME TIME: ', time);

			if (uid === activeGame?.black.uid) {
				// setActiveGameTime(time, 'black');
			} else if (uid === activeGame?.white.uid) {
				// setActiveGameTime(time, 'white');
			}

			setTime(durationToTime(time));
		}, 1000);

		return () => {
			clearTimeout(timeOut);
		};

		// eslint-disable-next-line
	}, [time, paused]);

	const handlePause = () => {
		setPaused(!paused);
		console.log('PARSE:', differenceInMilliseconds(end, new Date()));

		if (!paused) {
			setDifference(differenceInMilliseconds(end, new Date()));
		} else {
			let newEnd = new Date().getMilliseconds() + difference;
			let endDate = new Date();
			endDate.setMilliseconds(newEnd);

			setEnd(endDate);
		}

		// return paused && setEnd();
	};

	return (
		<GameInfoDisplayContainer>
			<TimerContainer>
				<GameTime>{time}</GameTime>

				{/* <CustomButton onClick={handlePause}>
					{paused ? 'Start' : 'Pause'}
				</CustomButton> */}
			</TimerContainer>
		</GameInfoDisplayContainer>
	);
};

export default GameInfoDisplay;
