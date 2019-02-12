import axios from 'axios';

const axiosLastfm = axios.create({
	baseURL: 'http://ws.audioscrobbler.com/2.0/'

});

axiosLastfm.defaults.headers.common['Authorization'] = process.env.REACT_APP_LASTM_KEY;

export default axiosLastfm;