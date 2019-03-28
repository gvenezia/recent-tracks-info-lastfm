import axios from 'axios';

const axiosMusicbrainz = axios.create({
	baseURL: `https://musicbrainz.org/ws/2/`
});

export default axiosMusicbrainz;
