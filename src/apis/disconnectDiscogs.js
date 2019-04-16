const disconnectDiscogs = () => {
	var Discogs = require('disconnect').Client;

	return new Discogs('WhatIsPlayingLastFM/1.0').database();
}

export default disconnectDiscogs;


