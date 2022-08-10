import { combineReducers } from 'redux';
import gameReducer from './game/game.reducer';
import userReducer from './users/user.reducer';

const rootReducer = combineReducers({
	user: userReducer,
	game: gameReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
