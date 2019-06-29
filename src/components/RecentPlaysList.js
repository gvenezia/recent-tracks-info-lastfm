import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import FeaturedSongCard from './FeaturedSongCard';
import RegularSongCard from './RegularSongCard';

class RecentPlaysList extends Component {

	renderList() {
		// Helper function to test whether a property exists
		const exists = x => typeof x !== 'undefined';

		let { songs, artists, credits, width } = this.props;

		console.log(width);

		// Map over all songs, checking for properties then returning JSX for each song
		return songs.map( (song, i) => {

			// Check that all properties exist and assign accordingly
			let title   = exists(song.name) ? song.name : 'N/A',
				artist = exists(song.artist) ? song.artist['#text'] : 'N/A',
				album  = exists(song.album) ? song.album['#text'] : 'N/A',
				date   = exists(song.date) ? moment.unix(song.date.uts).fromNow() : 'N/A',
				url    = exists(song.url) ? song.url : 'https://www.last.fm/search?q=' + artist;

			// Find the current song's artist info and credits
			const artistObj = artists.find( curr => curr.name === artist),
				  creditObj = credits.find( curr => curr.album === album);

			// Tags that shouldn't display
			const blockedTags = [ `${artist}`, 'seen live', 'fip', 'under 2000 listeners', 'nickelodeon'];

			let tagsF = [];
			
			if (exists(artistObj) ) {
				tagsF = artistObj.tags.tag.filter(tag => blockedTags.indexOf(tag.name) === -1);
			}

			// Create larger cards for the two most recent tracks
			if (width < 500){
				return (
					<RegularSongCard
						song={song} 
						artist={artist}
						title={title}
						date={date}
						url={url}
						album={album}
						key={i}
						tagsF={tagsF}
						artistObj={artistObj}
						creditObj={creditObj}
					/>
				)
			} else {
				// Create larger cards for the two most recent tracks
				if (i < 2) {
					return (
						<FeaturedSongCard 
							song={song} 
							artist={artist}
							title={title}
							date={date}
							url={url}
							album={album}
							key={i}
							tagsF={tagsF}
							artistObj={artistObj}
							creditObj={creditObj}
						/>
					)	
				} else { 
					// The rest of the songs will be displayed four columns wide with less info
					return (
						<RegularSongCard
							song={song} 
							artist={artist}
							title={title}
							date={date}
							url={url}
							album={album}
							key={i}
							tagsF={tagsF}
							artistObj={artistObj}
							creditObj={creditObj}
						/>
					)
				}
			}

			
		}); 
	} // End renderList()

	render(){
		return (
			<div className='ui stackable grid'>
				{ this.renderList() }
			</div> 

		)
	}
}

const mapStateToProps = state => {
	return { 
		songs: state.songs,
		credits: state.credits,
		artists: state.artists,
		user: state.user,
		width: state.width
	 }
}

export default connect(mapStateToProps)(RecentPlaysList);