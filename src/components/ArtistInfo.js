import React, { Component } from 'react';

import { connect } from 'react-redux';

class ArtistInfo extends Component {
	renderArtistInfo(artist) {

		if (artist.name !== null)
			console.log('artist not null');
		else 
			console.log('artist null');

		// return (
		// 	<p>this.</p>

		// 	<p></p>
		// )
	}

	render(){
		// let artist = {};
		// // let found = false;

		// if (this.props.artists.length > 0){
		// 	artist = this.props.artists.find( curr => curr.name === this.props.artist ) 
		// }

		// console.log('Found: ');
		// console.log(this.props.artists.find( curr => curr.name === this.props.artist ) );
		// console.log(artist);
		// console.log(this.props.artists);

		// { artist.hasOwnProperty('name') ? artist.name : 'Loading...' }

		return (
			<div>
				: 
			</div>
		)
	}
}

const mapStateToProps = state => {
	return { 
		artists: state.artists
	 }
}

export default connect(mapStateToProps)(ArtistInfo)