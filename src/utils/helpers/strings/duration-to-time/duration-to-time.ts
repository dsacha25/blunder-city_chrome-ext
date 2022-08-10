const durationToTime = (duration: Duration): string => {
	let minutes = duration.minutes || '00';
	let seconds = duration.seconds || '00';

	if (duration.seconds && duration.seconds < 10) {
		seconds = `0${duration.seconds}`;
	}

	if (duration.minutes && duration.minutes < 10) {
		minutes = `0${duration.minutes}`;
	}
	return `${minutes}:${seconds}`;
};

export default durationToTime;
