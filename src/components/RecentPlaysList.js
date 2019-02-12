import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSongs } from '../actions'

class RecentPlaysList extends Component {
	componentDidMount() {
		this.props.fetchSongs();
	}

	render(){
		console.log(this.props);
		return (
			<li>
				<ul>1</ul>	
			</li>
		)
	}
}

const mapStateToProps = state => {
	return { songs: state.songs }
}

export default connect(mapStateToProps, { fetchSongs })(RecentPlaysList);