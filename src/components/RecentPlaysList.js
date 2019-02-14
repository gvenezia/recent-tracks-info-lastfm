import React, { Component } from 'react';
import ArtistInfo from './ArtistInfo';

import { connect } from 'react-redux';
import { fetchSongs, fetchSongsAndArtists } from '../actions';
// import { fetchArtist } from '../actions';

class RecentPlaysList extends Component {
	componentDidMount() {
		this.props.fetchSongsAndArtists();
	}

	renderList() {
		// let count = 0;
		return this.props.songs.map( (song, i) => {
			

			// setTimeout( () => {
			// 	console.log(count);
			// 	this.props.fetchArtist(song.artist['#text'])
			// }, 3000 + (i * 3000))
			

			return (
				<div key={i} style={{marginTop: '14px'}} className="ui card four wide column">
				  <div className="image">
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
				    <ArtistInfo artist={song.artist['#text']}/>
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
			)
		});
	}

	render(){
		return (
			<div className='ui grid'>
				{this.renderList()}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return { songs: state.songs }
}

export default connect(mapStateToProps, { fetchSongs, fetchSongsAndArtists })(RecentPlaysList);