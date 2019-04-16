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
	await dispatch(fetchSongs());

	// const artists = _.uniq(_.map( getState().songs, 'artist[#text]' ));
	// const songs = _.uniq(_.map( getState().songs, 'name' ));

	// console.log(artists);

	// artists.forEach( artist => dispatch(fetchArtist(artist)) );
	// songs.forEach( song => dispatch(fetchCredit(song)) );

	// Alternate functional programming/chain logic
	_.chain( getState().songs )
		.map('artist[#text]')
		.uniq()
		.forEach( artist => dispatch(fetchArtist(artist)) )
		.value();
	
}

export const fetchSongs = () => async (dispatch, getState) => {
	let URIEncodedUser = encodeURIComponent(getState().user);

	const response = await axiosLastfm.get(
		`?method=user.getrecenttracks&user=${URIEncodedUser}&limit=18${lastfmKeyAndConfig}`
	);

	console.log(response);

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

export const fetchCredits = (song = '', artist = '', album = '') => async (dispatch, getState) => {
	// console.log(disconnectDiscogs, db.getRelease(176126, function(err, data){
	// 	console.log(data); }) );

	var Discogs = require('disconnect').Client;

	var db = new Discogs().database();
	const response = db.getRelease(176126, function(err, data){
		console.log(data);
		return data;
	});

	// const response = await disconnectDiscogs.search(`${song}`, {page: 2, per_page: 75}, (err, data) => {
	// 	console.log(data);
	// });

	dispatch( {
		type: 'FETCH_CREDITS',
		payload: response
	})
}