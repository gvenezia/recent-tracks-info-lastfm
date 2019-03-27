import React, { Component } from 'react';
import RecentPlaysList from './RecentPlaysList';
import { connect } from 'react-redux';

class App extends Component {
	state
	
	render(){
		console.clear()

		return (
			<div className="ui container">
				
				<h1>
					What Has 
					<span className="ui transparent input" style={{'width': '100px', 'color': 'red'}} >
						&nbsp;<input 
								type="text"
								placeholder="_______________" />
					</span>&nbsp; Been Listening to?
		 		</h1>
				<RecentPlaysList />
			</div>
		)
	}	
}

export default connect()(App);