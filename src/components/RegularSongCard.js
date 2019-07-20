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
				<section className="ui card centered">
					<figure className="image">
						<img alt="album art" 
							src={ song.image[3]['#text'].length > 0 ?
		    						 song.image[3]['#text'] :
		    						 'https://semantic-ui.com/images/wireframe/image.png'} />
					</figure>
					<div className="content">
						<h2 className="header">"{title}"</h2>
						<p className="meta">
							<span className="date">
						     	{ exists(song['@attr']) === true ?
						      		'Currently listening':
						      		date }
			      			</span>
						</p>
						<p className="description">
							<span data-tip={ exists(artistObj) ? artistObj.stats.userplaycount : 'N/A'} 
				         		data-for={artist + "tip"}>
					        {artist}
					        </span> — {album} ({exists(creditObj) ? creditObj.label : 'N/A'})
						</p>
					</div>
					<div className="extra content">
						<summary>
							<i className="info icon" />
							{ exists(artistObj) ? 
								artistObj.bio.content.slice(0, 100) + '...' :
								'Loading...' }
						</summary>
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
		    	</section>	
		    	<ReactTooltip
			    	getContent={(dataTip) => `Plays: ${dataTip}`} 
			    	id={artist + "tip"} 
			    	place="bottom" />
			</div>
		)
	}
}

export default connect()(RegularSongCard);