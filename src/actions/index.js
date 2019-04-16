import _ from 'lodash';
import axiosLastfm from '../apis/lastfm.js';
// import disconnectDiscogs from '../apis/disconnectDiscogs.js';
import { lastfmKeyAndConfig}  from '../apiKeys/lastfm.js';

export const setUser = (user = 'grrtano') => dispatch => {
	dispatch( { 
		type: 'SET_USER',
		payload: user
	});
};

export const fetchSongsAndArtists = () => async (dispatch, getState) => {
	await dispatch(fetchSongs());

	const fetchedArtists = _.uniq(_.map( getState().songs, 'artist[#text]' ));
	const stateArtists = _.map(getState().artists, 'name');			
	const newArtists = fetchedArtists.filter(artist => stateArtists.indexOf(artist) === -1);

	if (newArtists.length > 0)
		newArtists.forEach( artist => dispatch(fetchArtist(artist)) );
	
	// songs.forEach( song => dispatch(fetchCredit(song)) );
	// dispatch( fetchCredits() )

	// Alternate functional programming/chain logic
	// _.chain( getState().songs )
	// 	.map('artist[#text]')
	// 	.uniq()
	// 	.forEach( artist => dispatch(fetchArtist(artist)) )
	// 	.value();

	// console.log(
	// 	_.chain( getState().songs )
	// 		.map('artist[#text]')
	// 		.uniq().value()
	// 	);
	
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
	var Discogs = require('disconnect').Client;
	// search?release_title=nevermind&artist=nirvana&per_page=3&page=1

	var db = new Discogs('WhatIsPlayingLastFM/1.0', {userToken: 'DppIYtxGVQlPOvRJacAr'}).database();
	const response = db.search(
		'Why Sad Song',
		{page: 1, per_page: 1},
		function(err, data){
			console.log(data);
			return data;
	});

	db.getRelease(176126, function(err, data){
		console.log(data);
	});

	// const response = await disconnectDiscogs.search(`${song}`, {page: 2, per_page: 75}, (err, data) => {
	// 	console.log(data);
	// });

	dispatch( {
		type: 'FETCH_CREDITS',
		payload: response
	})
}