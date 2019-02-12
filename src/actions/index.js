import axiosLastfm from '../apis/lastfm.js';

export const fetchSongs = async () => {
	const response = await axiosLastfm.get('?method=user.getrecenttracks&user=grrtano');

	return { 
		type: 'FETCH',
		payload: response
	}
}