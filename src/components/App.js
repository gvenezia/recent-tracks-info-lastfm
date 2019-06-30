import React, { Component } from 'react';
import RecentPlaysList from './RecentPlaysList';
import { connect } from 'react-redux';

import { setUser, setWidth, fetchSongsAndArtists } from '../actions';

class App extends Component {

	componentDidMount() {
		this.props.setWidth(window.innerWidth);
		this.props.setUser();
		this.props.fetchSongsAndArtists();
		this.checkAPI();
	}

	handleSubmit(event) {
		event.preventDefault();
		console.log(event);
		alert('A name was submitted: ' + event.target.value);
		// this.props.setUser();
	}

	checkAPI(){
		setInterval( () =>{
			console.log('Checking for Last.fm updates');
			this.props.fetchSongsAndArtists()
		}, 5000)
	}
	
	render(){
		return (
			<div className="ui container">
				<h1>
					What Has Gaetano
					<span className="ui transparent input" style={{'width': '100px', 'color': 'red'}} >
						&nbsp;
			          <form className="ui form" onSubmit={this.handleSubmit} >
			            <input type="text" placeholder="_______________"/>
			          </form>
					</span>
					 &nbsp;Been Listening to?
		 		</h1>
				<RecentPlaysList />
			</div>
		)
	}	
}

export default connect(null, { setUser, setWidth, fetchSongsAndArtists })(App);