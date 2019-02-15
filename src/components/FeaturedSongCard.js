import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { connect } from 'react-redux';

class FeaturedSongCard extends Component {
	render() {
		let song = this.props.song,
				artist = this.props.artist,
				date = this.props.date,
				playing = typeof song['@attr'] !== 'undefined' ? true : false ;

		let artistObj = this.props.artists.find( curr => curr.name === artist),
				artObjDef = typeof artistObj !== 'undefined' ? true : false;

		return (
			<div style={{marginTop: '14px'}} className="eight wide column">
				<div className="ui items segment">
					<div className="ui item ">
					  <div style={{'width': '250px'}} className="image">
					    <img src={ song.image[3] ?
					    						 song.image[3]['#text'] :
					    						 'https://semantic-ui.com/images/wireframe/image.png'}
						  />
					  </div>
					  <div className="content">
					    <p className="header">"{song.name}"</p>
					    <div className="meta">
					      <span className="date">
					      	{ playing === true ?
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
					      { artObjDef && 
					      	(artistObj.bio.content.length < 1 ?
					      		'N/A' : 
					      		artistObj.bio.content.length <= 375 ?
					      			ReactHtmlParser(artistObj.bio.content) :
					      			ReactHtmlParser(artistObj.bio.content.slice(0, 375) + '...')) }
					    </p>
					    <p>
					    	<i className="music icon"></i>
					    	{ artObjDef &&
					    		(artistObj.tags.tag.length < 1 ?
					    			'N/A' :
					    			artistObj.tags.tag.map(tag => `${tag.name}, `) )}
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