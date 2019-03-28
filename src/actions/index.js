import _ from 'lodash';
import axiosLastfm from '../apis/lastfm.js';
import disconnectDiscogs from '../apis/disconnectDiscogs.js';
import { lastfmKeyAndConfig}  from '../apiKeys/lastfm.js';

export const setUser = (user = 'grrtano') => dispatch => {
	dispatch( { 
		type: 'SET_USER',
		payload: user
	});
};

export const fetchSongsAndArtists = () => async (dispatch, getState) => {
	await dispatch(fetchSongs(getState().user));

	// const artists = _.uniq(_.map( getState().songs, 'artist[#text]' ));
	// artists.forEach( artist => dispatch(fetchArtist(artist)) );

	// Alternate functional programming/chain logic
	_.chain( getState().songs )
		.map('artist[#text]')
		.uniq()
		.forEach( artist => dispatch(fetchArtist(artist)) )
		.value();
	
}

export const fetchSongs = (user = 'grrtano') => async dispatch => {
	let URIEncodedUser = encodeURIComponent(user);

	const response = await axiosLastfm.get(
		`?method=user.getrecenttracks&user=${URIEncodedUser}&limit=17${lastfmKeyAndConfig}`
	);

	dispatch( { 
		type: 'FETCH_SONGS',
		payload: response.data.recenttracks.track
	});
};

export const fetchArtist = (artist = '') => async dispatch => {
	// Encode properly so special characters like & and / don't break the API request
	let URIEncodedArtist = encodeURIComponent(artist);

	const response = await axiosLastfm.get(
		`?method=artist.getinfo&artist=${URIEncodedArtist}&user=grrtano${lastfmKeyAndConfig}`
	);

	dispatch( { 
		type: 'FETCH_ARTIST',
		payload: response.data.artist
	});
};

export const fetchCredits = (song = '', artist = '', album = '') => async dispatch => {
	var Discogs = require('disconnect').Client;
	
	var db = new Discogs().database();
	db.getRelease(176126, function(err, data){
		console.log(data);
	});

	// const response = await disconnectDiscogs.search(`${song}`, {page: 2, per_page: 75}, (err, data) => {
	// 	console.log(data);
	// });

	// dispatch( {
	// 	type: 'FETCH_CREDITS',
	// 	payload: response.data.credits
	// })
}