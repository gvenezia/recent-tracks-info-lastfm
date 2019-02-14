import React, { Component } from 'react';

import { connect } from 'react-redux';

class FeaturedSongCard extends Component {
	render() {
		let song = this.props.song,
			artist = this.props.artist;

		return (
			<div style={{marginTop: '14px'}} className="eight wide column">
				<div className="ui card ">
				  <div className="image">
				    <img src={song.image[3] ? song.image[3]['#text'] : ''} />
				  </div>
				  <div className="content">
				    <p className="header">"{song.name}"</p>
				    <div className="meta">
				      <span className="date">{song.date['#text']}</span>
				    </div>
				    <div className="description">
				      {song.artist['#text']} — {song.album['#text']}
				    </div>
				  </div>
				  <div className="extra content">
				    <p>
				      <i className="info icon"></i>
				      blah blah
				    </p>
				    <p>
				    	<i className="music icon"></i>
				    	Genres: TBD	
				    </p>
				  </div>
				</div>
			</div>
		)
	}

}

const mapStateToProps = (state, ownProps) => {
	return { artists: state.artists }
}

export default connect(mapStateToProps)(FeaturedSongCard)