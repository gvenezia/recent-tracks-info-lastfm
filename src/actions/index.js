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

export const fetchSongs = () =>  async dispatch => {
	const response = await axiosLastfm.get(
		'?method=user.getrecenttracks&user=grrtano&limit=17' + lastfmKeyAndConfig
	);

	dispatch( { 
		type: 'FETCH_SONGS',
		payload: response.data.recenttracks.track
	});
};

export const fetchArtist = (artist) =>  async dispatch => {
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