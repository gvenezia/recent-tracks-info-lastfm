var Discogs = require('disconnect').Client;

const disconnect = new Discogs('WhatIsPlayingLastFM/1.0', {
		consumerKey: 'DppIYtxGVQlPOvRJacAr',
	 	consumerSecret: 'SoHlTcKDWajSgJTcNgWwHxlhlAGLdZPu'
	 });

export default disconnect;