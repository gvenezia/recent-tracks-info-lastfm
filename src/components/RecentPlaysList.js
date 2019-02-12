import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSongs } from '../actions'

class RecentPlaysList extends Component {
	componentDidMount() {
		this.props.fetchSongs();
	}

	render(){
		return (
			<li>
				<ul>1</ul>	
			</li>
		)
	}
}

export default connect(null, { fetchSongs })(RecentPlaysList);