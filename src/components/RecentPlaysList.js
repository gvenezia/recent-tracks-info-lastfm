import React, { Component } from 'react';
import ArtistInfo from './ArtistInfo';
import FeaturedSongCard from './FeaturedSongCard';

import { connect } from 'react-redux';
import { fetchSongsAndArtists } from '../actions';

class RecentPlaysList extends Component {
	componentDidMount() {
		this.props.fetchSongsAndArtists();
	}

	renderList() {
		return this.props.songs.map( (song, i) => {
			let	artist = song.artist['#text'];

			let artistObj = this.props.artists.find( curr => curr.name === artist);

			console.log( this.props.artists );

			// Create larger cards for the two most recent tracks
			if (i < 2) {
				return (
					<FeaturedSongCard 
						key={i} 
						song={song} 
						artist={song.artist['#text']}
					/>
				)	
			}
			
			// The rest of the songs will be displayed four columns wide with less info
			return (
				<div key={i} style={{marginTop: '14px'}} className="four wide column">
					<div className="ui card">
					  <div className="image left floated medium">
					    <img src={song.image[3] ? song.image[3]['#text'] : ''} />
					  </div>
					  <div className="content">
					    <p className="header">"{song.name}"</p>
					    <div className="meta">
					      <span className="date">{song.date['#text']}</span>
					    </div>
					    <div className="description">
					      {song.artist['#text']} — {song.album['#text']}
					    </div>
					    <ArtistInfo artist={artist}/>
					  </div>
					  <div className="extra content">
					    <p>
					      <i className="info icon"></i>
					      blah blah
					    </p>
					    <p>
					    	<i className="music icon"></i>
					    	Genres: TBD	
					    </p>
					  </div>
				    </div>	
				</div>
			)
		});
	}

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