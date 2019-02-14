import React, { Component } from 'react';

import { connect } from 'react-redux';

class FeaturedSongCard extends Component {
	render() {
		let song = this.props.song,
			artist = this.props.artist,
			date = this.props.date,
			playing = this.props.playing;

		let artistObj = this.props.artists.find( curr => curr.name === artist);

		return (
			<div style={{marginTop: '14px'}} className="eight wide column">
			<div className="ui items segment">
				<div className="ui item ">
				  <div className="image large">
				    <img src={song.image[3] ? song.image[3]['#text'] : ''} />
				  </div>
				  <div className="content">
				    <p className="header">"{song.name}"</p>
				    <div className="meta">
				      <span className="date">
				      	{ playing === 'true' ?
				      		'Currently listening':
				      		date }
			      	  </span>
				    </div>
				    <div className="description">
				      {artist} — {song.album['#text']}
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

const mapStateToProps = state => {
	return { artists: state.artists }
}

export default connect(mapStateToProps)(FeaturedSongCard)