import _ from 'lodash';
import axiosLastfm from '../apis/lastfm.js';
import disconnect from '../apis/disconnectDiscogs.js';
import { lastfmKeyAndConfig}  from '../apiKeys/lastfm.js';

let db = disconnect.database();

export const setUser = (user = 'grrtano') => dispatch => {
	dispatch( { 
		type: 'SET_USER',
		payload: user
	});
};

export const fetchSongsAndArtists = () => async (dispatch, getState) => {
	await dispatch(fetchSongs());

	let { songs, artists } = getState();

	// songs.forEach(song => dispatch( fetchCredits(song) ))

	const fetchedArtists = _.uniq(_.map( songs, 'artist[#text]' ));
	const stateArtists = _.map(artists, 'name');			
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
	let URIEncodedUser = encodeURIComponent(getState().user)

	const response = await axiosLastfm.get(
		`?method=user.getrecenttracks
		&user=${URIEncodedUser}
		&limit=18
		${lastfmKeyAndConfig}`
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

export const fetchCredits = (song = '') => (dispatch, getState) => {

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

	// const response = await disconnectDiscogs.search(`${song}`, {page: 2, per_page: 75}, (err, data) => {
	// 	console.log(data);
	// });

	dispatch( {
		type: 'FETCH_CREDITS',
		payload: response
	})
}