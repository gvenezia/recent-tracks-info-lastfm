import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';

import Links from './Links';

class FeaturedSongCard extends Component {
	render() {
		// Helper function to test whether a property exists
		const exists = x => typeof x !== 'undefined';

		// Destructure props variables
		let { song, title, artist, album, date, tagsF, artistObj, creditObj, key, url } = this.props;

		return (
			<div key={key} className="eight wide column">
				<div style={{marginTop: '14px'}} className="ui items segment">
					<div className="ui item">
					  <div style={{'width': '250px'}} className="image">
					    <img 
							alt="album art" 
							src={ song.image[3]['#text'].length > 0 ?
		    						 song.image[3]['#text'] :
		    						 'https://semantic-ui.com/images/wireframe/image.png'}
						/>
					  </div>
					  <div className="content">
					    <p className="header">"{title}"</p>
					    <div className="meta">
					    	<span className="date">
						     	{ exists(song['@attr']) === true ?
						      		'Currently listening':
						      		date }
			      			</span>
					    </div>
					    <div className="description">
					      <span data-tip={ exists(artistObj) ? artistObj.stats.userplaycount : 'N/A'} 
					         		data-for={artist + "-featured-tip"}>
					         {artist}
					         </span> — {album} ({exists(creditObj) ? creditObj.label : 'N/A'})
					    </div>
						<div className="extra">
					    <p>
					      <i className="info icon"/>
					      { exists(artistObj) && 
					      	(artistObj.bio.content.length < 1 ?
					      		'N/A' : 
					      		artistObj.bio.content.length <= 375 ?
					      			ReactHtmlParser(artistObj.bio.content) :
					      			ReactHtmlParser(artistObj.bio.content.slice(0, 375) + '...')) }
					      	
					    </p>
					    <p>
					    	<i className="music icon"></i>
					    	{ tagsF.map( (tag, i) => {
								return i + 1 === tagsF.length ?
									`${tag.name}` :
									`${tag.name}, `;
								})
				    		}
					    </p>
					    <Links 
							artist={artist}
							url={url}
							creditObj={creditObj}/>

					    <ReactTooltip
					    	getContent={(dataTip) => `Plays: ${dataTip}`} 
					    	id={artist + "-featured-tip"} 
					    	place="left" 
					    	type="dark" 
					    	effect="float" />

						</div>
					  </div>
					</div>
				</div>
			</div>
		)
	}
}

export default connect()(FeaturedSongCard);