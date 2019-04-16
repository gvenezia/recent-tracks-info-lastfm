import React, { Component } from 'react';
import RecentPlaysList from './RecentPlaysList';
import { connect } from 'react-redux';

import { setUser, fetchCredits } from '../actions';

class App extends Component {

  componentDidMount() {
    this.props.setUser()
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.setUser();
  }
	
	render(){
		console.clear()

		return (
			<div className="ui container">
				
				<h1>
					What Has 
					<span className="ui transparent input" style={{'width': '100px', 'color': 'red'}} >
						&nbsp;
            <form 
              class="ui form" 
              onSubmit={this.handleSubmit} 
            >
              <input 
								type="text"
								placeholder="_______________"
              />
            </form>
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