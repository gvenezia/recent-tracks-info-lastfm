import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';

import '../index.css';

class RegularSongCard extends Component {
	render() {
		// Helper function to test whether a property exists
		const exists = x => typeof x !== 'undefined';

		// Destructure props variables
		let { song, title, artist, album, date, tagsF, artistObj, creditObj, key, url } = this.props;

		return (
			<div key={key} style={{marginTop: '14px'}} className="stackable four wide column">
				<div className="ui card">
					<div className="image">
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
							<span className="date">{ date }</span>
						</div>
						<div className="description">
							<span data-tip={ exists(artistObj) ? artistObj.stats.userplaycount : 'N/A'} 
				         		data-for={artist + "tip"}>
				         {artist}
				         </span> — {album} ({exists(creditObj) ? creditObj.label : 'Loading...'})
						</div>
					</div>
					<div className="extra content">
						<p>
							<i className="info icon" />
							{ exists(artistObj) ? 
								artistObj.bio.content.slice(0, 100) + '...' :
								'Loading...' }
						</p>
						<p>
							<i className="music icon"></i>
							{ 
								tagsF.map( (tag, i) => {
										return i + 1 === tagsF.length ?
											`${tag.name}` :
											`${tag.name}, `;
								})
							}
						</p>

					    <ReactTooltip
					    	getContent={(dataTip) => `Plays: ${dataTip}`} 
					    	id={artist + "tip"} 
					    	place="left" 
					    	type="dark" 
					    	effect="float" />
					</div>
					<div className="extra content">
						External Links: &nbsp;
					    <a target="_blank"
					    	rel="noopener noreferrer"
					    	href={"https://www.discogs.com/" + (exists(creditObj) ? creditObj.uri : '')}>
					    	<img className="link-icons" 
						    	src="discogs-icon.jpeg"
						    	alt="discogs-icon"/>
				    	</a> &nbsp;
				    	<a target="_blank"
					    	rel="noopener noreferrer"
					    	href={url}>
					    	<i id="lastfm-icon" className="lastfm icon red"></i>
				    	</a>
				    	<a target="_blank"
					    	rel="noopener noreferrer"
					    	href={"https://en.wikipedia.org/wiki/" + encodeURIComponent(artist) }>Wiki</a>
				    	
					</div>
		    	</div>	
			</div>
		)
	}
}

export default connect()(RegularSongCard);