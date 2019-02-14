import _ from 'lodash';
import axiosLastfm from '../apis/lastfm.js';
import { lastfmKeyAndConfig}  from '../apiKeys/lastfm.js';

export const fetchSongsAndArtists = () => async (dispatch, getState) => {
	await dispatch(fetchSongs());

	// const artists = _.uniq(_.map( getState().songs, 'artist[#text]' ));
	// artists.forEach( artist => dispatch(fetchArtist(artist)) );

	// Alternate chain logic
	_.chain( getState().songs )
		.map('artist[#text]')
		.uniq()
		.forEach( artist => dispatch(fetchArtist(artist)) )
		.value();
	
}

// Redux-thunk allows a function to be returned instead of an object
	// Within the function, we then dispatch the object manually
export const fetchSongs = () =>  async dispatch => {
	const response = await axiosLastfm.get(
		'?method=user.getrecenttracks&user=grrtano&limit=89' + lastfmKeyAndConfig
	);

	dispatch( { 
		type: 'FETCH_SONGS',
		payload: response.data.recenttracks.track
	});
};

export const fetchArtist = (artist) =>  async dispatch => {
	const response = await axiosLastfm.get(
		`?method=artist.getinfo&artist=${artist}&user=grrtano${lastfmKeyAndConfig}`
	);

	dispatch( { 
		type: 'FETCH_ARTIST',
		payload: response.data.artist
	});
};