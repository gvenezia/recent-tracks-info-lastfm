import axiosLastfm from '../apis/lastfm.js';
import { lastfmKeyAndConfig}  from '../apiKeys/lastfm.js';

// Redux-thunk allows a function to be returned instead of an object
	// Within the function, we then dispatch the object manually
export const fetchSongs = () =>  async (dispatch, getState) => {
	const response = await axiosLastfm.get(
		'?method=user.getrecenttracks&user=grrtano' + lastfmKeyAndConfig
	);

	console.log(response.data);

	dispatch( { 
		type: 'FETCH_SONGS',
		payload: response.data.recenttracks.track
	});
};

export const fetchArtist = () =>  async (dispatch, getState) => {
	const response = await axiosLastfm.get(
		'?method=artist.getinfo&artist=Cher&user=grrtano' + lastfmKeyAndConfig
	);

	console.log(response.data);

	dispatch( { 
		type: 'FETCH_ARTIST',
		payload: response.data.artist
	});
};