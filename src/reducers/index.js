import { combineReducers } from 'redux';
import artistReducer from './artistReducer';
import creditsReducer from './creditsReducer';
import songsReducer from './songsReducer';
import userReducer from './userReducer';
import widthReducer from './widthReducer';

export default combineReducers({
	artists: artistReducer,
	credits: creditsReducer,
	songs: songsReducer,
	user: userReducer,
	width: widthReducer
});