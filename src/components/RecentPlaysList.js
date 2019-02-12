import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSongs } from '../actions'

class RecentPlaysList extends Component {
	componentDidMount() {
		this.props.fetchSongs();
	}

	renderList() {
		return this.props.songs.map( song => {
			return (
				<div key={song.mbid} style={{marginTop: '14px'}} class="ui card four wide column">
				  <div class="image">
				    <img src={song.image[3] ? song.image[3]['#text'] : ''} />
				  </div>
				  <div class="content">
				    <p class="header">"{song.name}"</p>
				    <div class="meta">
				      <span class="date">{song.date['#text']}</span>
				    </div>
				    <div class="description">
				      {song.artist['#text']} — {song.album['#text']}
				    </div>
				  </div>
				  <div class="extra content">
				    <p>
				      <i class="info icon"></i>
				      blah blah
				    </p>
				    <p>
				    	<i class="music icon"></i>
				    	Genres: TBD	
				    </p>
				  </div>
				</div>
			)
		});
	}

	render(){
		console.log(this.props);
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

export default connect(mapStateToProps, { fetchSongs })(RecentPlaysList);