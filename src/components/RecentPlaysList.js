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
		return this.props.songs.map( (song, i) => {
			let	name = typeof song.name !== 'undefined' ? song.name : 'N/A',
				artist = typeof song.artist['#text'] !== 'undefined' ? song.artist['#text'] : 'N/A',
				album = typeof song.album['#text'] !== 'undefined' ? song.album['#text'] : 'N/A',
				date = typeof song.date !== 'undefined' ? song.date['#text'] : 'N/A',
				playing = typeof song['@attr'] !== 'undefined' ? true : false ;

			let artistObj = this.props.artists.find( curr => curr.name === artist);

			console.log(  );

			// Create larger cards for the two most recent tracks
			if (i < 2) {
				return (
					<FeaturedSongCard 
						key={i} 
						song={song} 
						artist={artist}
						date={date}
						playing={playing}
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
					    <p className="header">"{name}"</p>
					    <div className="meta">
					      <span className="date">
					      	{ playing === true ?
					      		'Currently listening':
					      		date }
					      </span>
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