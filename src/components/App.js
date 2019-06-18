import React, { Component } from 'react';
import RecentPlaysList from './RecentPlaysList';
import { connect } from 'react-redux';

import { setUser, fetchSongsAndArtists } from '../actions';

class App extends Component {

  componentDidMount() {
    this.props.setUser();
    this.props.fetchSongsAndArtists();
    this.checkAPI();
  }

  handleSubmit(event) {
    event.preventDefault();
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
					{/*<span className="ui transparent input" style={{'width': '100px', 'color': 'red'}} >
						&nbsp;
	          <form 
	            className="ui form" 
	            onSubmit={this.handleSubmit} 
	          >
	            <input 
								type="text"
								placeholder="_______________"
	            />
	          </form>
					</span>&nbsp; */}
					 Been Listening to?
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

export default connect(mapStateToProps, { setUser, fetchSongsAndArtists })(App);