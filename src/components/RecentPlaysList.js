import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import FeaturedSongCard from './FeaturedSongCard';
import { fetchSongsAndArtists } from '../actions';

class RecentPlaysList extends Component {
	componentDidMount() {
		this.props.fetchSongsAndArtists();

		this.checkAPI();
	}

	checkAPI(){
		setInterval( () =>{
			console.log('Checking API');
			this.props.fetchSongsAndArtists()
		}, 5000)
	}

	renderList() {
		// Helper function to test whether a property exists
		const exists = x => typeof x !== 'undefined';

		// Map over all songs, checking for properties then returning JSX for each song
		return this.props.songs.map( (song, i) => {

			// Check that all properties exist and assign accordingly
			let name = exists(song.name) ? song.name : 'N/A',
					artist = exists(song.artist) ? song.artist['#text'] : 'N/A',
					album = exists(song.album) ? song.album['#text'] : 'N/A',
					date = exists(song.date) ? moment.unix(song.date.uts).fromNow() : 'N/A';

			// Find the current song's artist info
			let artistObj = this.props.artists.find( curr => curr.name === artist);

			// Create larger cards for the two most recent tracks
			if (i < 2) {
				return (
					<FeaturedSongCard 
						song={song} 
						artist={artist}
						date={date}
					/>
				)	
			}
			
			// The rest of the songs will be displayed four columns wide with less info
			return (
				<div key={i} style={{marginTop: '14px'}} className="four wide column">
					<div className="ui card">
						<div className="image">
							<img src={ song.image[3] ?
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
								{artist} — {album}
							</div>
						</div>
						<div className="extra content">
							<p>
								<i className="info icon"></i>
								{ exists(artistObj) ? 
									artistObj.bio.content.slice(0, 100) + '...' :
									'Loading...' }
							</p>
							<p>
								<i className="music icon"></i>
								{ exists(artistObj) ? 
									artistObj.tags.tag.map(tag => `${tag.name}, `) :
									'Loading...' }
							</p>
						</div>
			    </div>	
				</div>
			)
		}); 
	} // End renderList()

	render(){
		return (
			<div className='ui relaxed grid'>
				{this.renderList()}

{/*}				<div className="four wide column">
					<div className="ui card">
					  <div className="image">
					    <img src="https://semantic-ui.com/images/wireframe/image.png" />
					  </div>
					  <div className="content">
					    <p className="header">Load More</p>
					  </div>
					</div>
				</div>	*/}
			</div> 
		)
	}
}

const mapStateToProps = state => {
	return { 
		songs: state.songs,
		artists: state.artists
	 }
}

export default connect(mapStateToProps, { fetchSongsAndArtists })(RecentPlaysList);