import _ from 'lodash';
import axiosLastfm from '../apis/lastfm.js';
import disconnect from '../apis/disconnectDiscogs.js';
import { lastfmKeyAndConfig}  from '../apiKeys/lastfm.js';

const db = disconnect.database();

export const setUser = (user = 'grrtano') => dispatch => {
	dispatch( { 
		type: 'SET_USER',
		payload: user
	});
};

export const fetchSongsAndArtists = () => async (dispatch, getState) => {
	const URIEncodedUser = encodeURIComponent(getState().user)

	const stateMbids = _.uniq(_.map( getState().songs, 'mbid'));
	// console.log(stateMbids);

	await dispatch(fetchSongs(URIEncodedUser));

	let { songs, artists } = getState();	

	// Helper function sourced from: https://ilikekillnerds.com/2016/05/removing-duplicate-objects-array-property-name-javascript/ 
	let newSongs = songs.filter((currObj, i, originalArr) => {
		let urls = originalArr.map(currMapObj => currMapObj.url);
        return urls.indexOf(currObj.url) === i; // .indexOf finds the first instance of the url, so every subsequent url in the array won't return `true` (ie be included in the filtered array) bc it won't match the current index `i`
    });

	newSongs = newSongs.filter(song => stateMbids.indexOf(song.mbid) === -1);

	console.log(newSongs);

	// if (newSongs.length > 0)
	// 	newSongs.forEach( song => dispatch( fetchCredits(song) ) );

	// Check for any new artists
	const fetchedArtists = _.uniq(_.map( songs, 'artist[#text]' ));
	const stateArtists = _.map(artists, 'name');			
	const newArtists = fetchedArtists.filter(artist => stateArtists.indexOf(artist) === -1);

	if (newArtists.length > 0)
		newArtists.forEach( artist => dispatch(fetchArtist(artist, URIEncodedUser)) );

	// Alternate functional programming/chain logic
	// _.chain( getState().songs )
	// 	.map('artist[#text]')
	// 	.uniq()
	// 	.forEach( artist => dispatch(fetchArtist(artist)) )
	// 	.value();
	
}

export const fetchSongs = (user = '') => async (dispatch, getState) => {
	const response = await axiosLastfm.get(
		`?method=user.getrecenttracks
		&user=${user}
		&limit=18
		${lastfmKeyAndConfig}`
	);

	console.log(response);

	dispatch( { 
		type: 'FETCH_SONGS',
		payload: response.data.recenttracks.track
	});
};

export const fetchArtist = (artist = '', user = '') => async dispatch => {
	// Encode properly so special characters like & and / don't break the API request
	let URIEncodedArtist = encodeURIComponent(artist);

	const response = await axiosLastfm.get(
		`?method=artist.getinfo
		&artist=${URIEncodedArtist}
		&user=${user}
		${lastfmKeyAndConfig}`
	);

	console.log(response.data.artist);

	dispatch( { 
		type: 'FETCH_ARTIST',
		payload: response.data.artist
	});
};

export const fetchCredits = (song = '') => (dispatch, getState) => {

	// let { songs } = getState().songs;
	// Eliminate duplicates
	// let filteredSongs = _.uniq(_.map( songs, 'mbid'));

	console.log(song.name);

	let response = db.search(
			song.name,
			{page: 1, per_page: 10, artist: song.artist['#text'] },
			function(err, data){ return data.results } 
		);



	// db.getRelease(176126, function(err, data){
	// 	console.log(data);
	// });

	dispatch( {
		type: 'FETCH_CREDITS',
		payload: response
	})
}