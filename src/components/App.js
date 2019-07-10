import React, { Component } from 'react';
import { connect } from 'react-redux';

import RecentPlaysList from './RecentPlaysList';

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
		this.props.setUser();
		this.props.fetchSongsAndArtists();
		this.setState({user: this.props.user});
		this.checkAPI();
	}

	handleChange(event){
		const value = event.target.value;
		console.log(value);
		this.setState({user: value});
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.setUser(this.state.user);
		this.props.fetchSongsAndArtists()
	}

	checkAPI(){
		setInterval( () =>{
			console.log('Checking for Last.fm updates');
			this.props.fetchSongsAndArtists()
		}, 5000)
	}
	
	render(){
		let {user} = this.props;
		return (
			<div className="ui container">
				<div className='ui stackable grid'>
					<div className="eight wide column">
					<h1>
						Extended Plays &nbsp;
						<span className="ui" 
							data-tooltip="A feed of recently played music with extra information and prepulated external links" 
							data-position="bottom center"
							data-variation="large">
							<i className="info circle small icon" />
						</span>

					</h1>
					</div>
					<div className="eight wide column">
						<div className="auth">
							<span>Signed in as &nbsp;</span>
							<p className="ui transparent input" >
						          <form className="ui transparent input" onSubmit={this.handleSubmit} >
						            <input type="text" 
						            	id="title"
										value={this.state.user}
										onChange={this.handleChange}
										placeholder={user}/>
						          </form>
							</p>
						</div>
					</div>

					<RecentPlaysList />
				</div>
			</div>
		)
	}	
}

const mapStateToProps = state => ({ user: state.user})

export default connect(mapStateToProps, { setUser, setWidth, fetchSongsAndArtists })(App);