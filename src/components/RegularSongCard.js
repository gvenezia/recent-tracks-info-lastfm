import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';

import Links from './Links';

import '../index.css';

class RegularSongCard extends Component {
	render() {
		// Helper function to test whether a property exists
		const exists = x => typeof x !== 'undefined';

		// Destructure props variables
		let { song, title, artist, album, date, tagsF, artistObj, creditObj, key, url } = this.props;

		return (
			<div key={key} className="four wide column">
				<div className="ui card centered">
					<div className="image">
						<img alt="album art" 
							src={ song.image[3]['#text'].length > 0 ?
		    						 song.image[3]['#text'] :
		    						 'https://semantic-ui.com/images/wireframe/image.png'} />
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
				         		data-for={artist + "tip"}>
					        {artist}
					        </span> — {album} ({exists(creditObj) ? creditObj.label : 'N/A'})
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
					</div>

					<Links 
						artist={artist}
						url={url}
						creditObj={creditObj}/>
		    	</div>	
		    	<ReactTooltip
			    	getContent={(dataTip) => `Plays: ${dataTip}`} 
			    	id={artist + "tip"} 
			    	place="bottom" />
			</div>
		)
	}
}

export default connect()(RegularSongCard);