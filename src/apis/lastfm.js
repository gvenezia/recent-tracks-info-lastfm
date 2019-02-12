import axios from 'axios';

const axiosLastfm = axios.create({
	baseURL: `http://ws.audioscrobbler.com/2.0/`
});

export default axiosLastfm;