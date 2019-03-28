import React, { Component } from 'react';
import RecentPlaysList from './RecentPlaysList';
import { connect } from 'react-redux';

import { setUser, fetchCredits } from '../actions';

class App extends Component {
	
	render(){
		console.clear()

		return (
			<div className="ui container">
				
				<h1>
					What Has 
					<span className="ui transparent input" style={{'width': '100px', 'color': 'red'}} >
						&nbsp;<input 
								type="text"
								placeholder="_______________"
                onSubmit={this.props.fetchCredits("3 Pieces for String Quartet: No. 1")} />
					</span>&nbsp; Been Listening to?
		 		</h1>
				<RecentPlaysList />
			</div>
		)
	}	
}

const mapStateToProps = state => {
	return { 
    user: state.user,
    credits: state.credits
  }
}

export default connect(mapStateToProps, { setUser, fetchCredits })(App);