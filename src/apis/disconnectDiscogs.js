import disconnect from 'disconnect';

const disconnectDiscogs = () => {
	var Discogs = disconnect.Client;

	var dis = new Discogs('WhatIsPlayingLastFM/1.0');

	return dis.database();
}

export default disconnectDiscogs;


