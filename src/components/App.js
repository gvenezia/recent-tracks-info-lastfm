import React, { Component } from 'react';
import RecentPlaysList from './RecentPlaysList';
import { connect } from 'react-redux';

import { setUser, setWidth, fetchSongsAndArtists } from '../actions';

class App extends Component {
	constructor(){
		super();

		this.state = {user: ''};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		this.props.setWidth(window.innerWidth);
		// this.props.setUser();
		this.props.fetchSongsAndArtists();
		this.checkAPI();
	}

	handleChange(event){
		const value = event.target.value;
		console.log(value);
		this.setState({user: value})
		
	}

	handleSubmit(event) {
		event.preventDefault();
		console.log(this.state.user);
		this.props.setUser(this.state.user);
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
			            <input type="text" 
			            	id="title"
            				value={this.state.user}
            				onChange={this.handleChange} 
            				placeholder="_______________"/>
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