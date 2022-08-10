import { HistoryMove } from '../../../types/chess/history-move/history-move';

const getPreviousMove = (history?: HistoryMove[]): string => {
	if (!history || history.length < 1) {
		return 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
	} else {
		return history[history.length - 1].fen;
	}
};

export default getPreviousMove;
