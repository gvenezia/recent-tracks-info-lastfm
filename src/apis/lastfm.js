import axios from 'axios';

const axiosLastfm = axios.create({
	baseURL: `https://ws.audioscrobbler.com/2.0/`
});

export default axiosLastfm;