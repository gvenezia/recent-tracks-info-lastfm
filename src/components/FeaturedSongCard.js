import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';

class FeaturedSongCard extends Component {
	render() {
		// Helper function to test whether a property exists
		const exists = x => typeof x !== 'undefined';

		// Destructure props variables
		let { song, artist, artists, date } = this.props;
				
		// Find calculated variables
		let	artistObj = artists.find( curr => curr.name === artist);

			console.log(artistObj);

		return (
			<div style={{marginTop: '14px'}} className="eight wide column">
				<div className="ui items segment">
					<div className="ui item ">
					  <div style={{'width': '250px'}} className="image">
					    <img 
							alt="album art" 
							src={ song.image[3]['#text'].length > 0 ?
		    						 song.image[3]['#text'] :
		    						 'https://semantic-ui.com/images/wireframe/image.png'}
						/>
					  </div>
					  <div className="content">
					    <p className="header">"{song.name}"</p>
					    <div className="meta">
					      <span className="date">
					      	{ exists(song['@attr']) === true ?
					      		'Currently listening':
					      		date }
				      	  </span>
					    </div>
					    <div className="description">
					      {artist} — {song.album['#text']}
					    </div>
						<div className="extra">
					    <p>
					      <i className="info icon" 
					         data-tip="React-tooltip" 
					         data-for={artist + "tip"}></i>
					      { exists(artistObj) && 
					      	(artistObj.bio.content.length < 1 ?
					      		'N/A' : 
					      		artistObj.bio.content.length <= 375 ?
					      			ReactHtmlParser(artistObj.bio.content) :
					      			ReactHtmlParser(artistObj.bio.content.slice(0, 375) + '...')) }
					      	
					    </p>
					    <p>
					    	<i className="music icon"></i>
					    	{ exists(artistObj) &&
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