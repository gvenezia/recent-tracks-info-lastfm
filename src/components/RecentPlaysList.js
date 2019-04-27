import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import ReactTooltip from 'react-tooltip';

import FeaturedSongCard from './FeaturedSongCard';

class RecentPlaysList extends Component {

	renderList() {
		// Helper function to test whether a property exists
		const exists = x => typeof x !== 'undefined';

		let { songs, artists } = this.props;

		// Map over all songs, checking for properties then returning JSX for each song
		return songs.map( (song, i) => {

			// Check that all properties exist and assign accordingly
			let name   = exists(song.name) ? song.name : 'N/A',
					artist = exists(song.artist) ? song.artist['#text'] : 'N/A',
					album  = exists(song.album) ? song.album['#text'] : 'N/A',
					date   = exists(song.date) ? moment.unix(song.date.uts).fromNow() : 'N/A';

			// Find the current song's artist info
			let artistObj = artists.find( curr => curr.name === artist);

			// Tags that shouldn't display
			let blockedTags = ['seen live', 'fip', 'under 2000 listeners'];

			let tagsF = [];
			
			if (exists(artistObj) ) {
				tagsF = artistObj.tags.tag.filter(tag => blockedTags.indexOf(tag.name) === -1);
			}

			// Create larger cards for the two most recent tracks
			if (i < 2) {
				return (
					<FeaturedSongCard 
						song={song} 
						artist={artist}
						date={date}
						key={i}
					/>
				)	
			}
			
			// The rest of the songs will be displayed four columns wide with less info
			return (
				<div key={i} style={{marginTop: '14px'}} className="four wide column">
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
							<p className="header">"{name}"</p>
							<div className="meta">
								<span className="date">{ date }</span>
							</div>
							<div className="description">
								<span data-tip={ exists(artistObj) ? artistObj.stats.userplaycount : 'N/A'} 
					         		data-for={artist + "tip"}>
					         {artist}
					         </span> — {album}
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
			    </div>	
				</div>
			)
		}); 
	} // End renderList()

	render(){
		return (
			<div className='ui relaxed grid'>
				{ this.renderList() }
			</div> 

		)
	}
}

const mapStateToProps = state => {
	return { 
		songs: state.songs,
		artists: state.artists,
		user: state.user
	 }
}

export default connect(mapStateToProps)(RecentPlaysList);