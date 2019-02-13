import React, { Component } from 'react';

import { connect } from 'react-redux';
import { fetchArtist } from '../actions';

class ArtistInfo extends Component {

	render(){
		return (
			<div onClick={this.props.fetchArtist(this.props.artist)}>
				ArtistInfo
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return { artist: ownProps.artist }
}

export default connect(mapStateToProps, { fetchArtist })(ArtistInfo)