import React, { Component } from 'react';

import { connect } from 'react-redux';

class FeaturedSongCard extends Component {
	render() {
		let song = this.props.song,
			artist = this.props.artist;

		let artistObj = this.props.artists.find( curr => curr.name === artist);

		console.log( this.props.artists );

		return (
			<div style={{marginTop: '14px'}} className="eight wide column">
			<div className="ui items segment">
				<div className="ui item ">
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
					<div className="extra">
					    <p>
					      <i className="info icon"></i>
					      { typeof artistObj !== 'undefined' ? 
					      	artistObj.bio.content.slice(0, 300) :
					      	'Loading...' }
					    </p>
					    <p>
					    	<i className="music icon"></i>
					    	{ typeof artistObj !== 'undefined' ? 
					    		artistObj.tags.tag[0].name :
					    		'Loading...' }
					    </p>
					</div>
				  </div>
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