import React, { Component } from 'react';
// import ArtistInfo from './ArtistInfo';
import FeaturedSongCard from './FeaturedSongCard';

import { connect } from 'react-redux';
import { fetchSongsAndArtists } from '../actions';

class RecentPlaysList extends Component {
	componentDidMount() {
		this.props.fetchSongsAndArtists();
	}

	renderList() {
		// Helper function to test whether a property exists
		const exists = prop => typeof prop !== 'undefined';

		return this.props.songs.map( (song, i) => {
			let	name = exists(song.name) ? song.name : 'N/A',
				artist = exists(song.artist) ? song.artist['#text'] : 'N/A',
				album = exists(song.album) ? song.album['#text'] : 'N/A',
				date = exists(song.date) ? song.date['#text'] : 'N/A';

			let artistObj = this.props.artists.find( curr => curr.name === artist);

			// Create larger cards for the two most recent tracks
			if (i < 2) {
				return (
					<FeaturedSongCard 
						key={i} 
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
					  <div className="image left">
					    <img src={song.image[3] ? song.image[3]['#text'] : ''} />
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
			)
		}); 
	} // End renderList()

	render(){
		return (
			<div className='ui relaxed grid'>
				{this.renderList()}
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