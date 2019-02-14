import { combineReducers } from 'redux';
import songsReducer from './songsReducer';
import artistReducer from './artistReducer';

export default combineReducers({
	songs: songsReducer,
	artists: artistReducer
});