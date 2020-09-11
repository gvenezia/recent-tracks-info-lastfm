import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';

import RecentPlaysList from './RecentPlaysList';

import { setUser, setWidth, fetchSongsAndArtists } from '../actions';

class App extends Component {
	constructor(){
		super();

		this.state = {user: 'gaetano_venezia'};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		this.props.setWidth(window.innerWidth);
		this.props.setUser(this.state.user);
		this.props.fetchSongsAndArtists();
		this.checkAPI();
	}

	handleChange(event){
		const value = event.target.value;
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
		return (
			<div className="ui grid container">
				<div className='ui stackable grid'>
					<header className="left aligned bottom aligned eight wide column">
						<h1>
							Extended Plays &nbsp;
							<i className="info circle small icon"
								data-tip data-for="info-tip"/>
						</h1>
					</header>
					<header className="right aligned bottom aligned eight wide column">
						<div className="auth ui item">
							<span>Showing listening history for &nbsp;</span>
							<div className="ui transparent input" >
								<form className="ui transparent input" 
										onSubmit={this.handleSubmit} >
									<input type="text" 
									    	id="title"
											value={this.state.user}
											onChange={this.handleChange}/>
								</form>
							</div>
						</div>
					</header>

					<RecentPlaysList />
				 	<ReactTooltip id="info-tip" place="bottom">
				 		<p>A feed of recently played music with extra information and prepopulated external links.</p>
				 		<p>If you have a last-fm username, type it into the underlined input form and press enter to see your results!</p>
				 		<p>I've preloaded my username and listening history in case you don't use last-fm but still want to see results.</p>
				 		<p>Hover or click on artist name to see how many times you've played that artist.</p>
				 	</ReactTooltip>
				</div>
			</div>
		)
	}	
}

const mapStateToProps = state => ({ user: state.user})

export default connect(mapStateToProps, { setUser, setWidth, fetchSongsAndArtists })(App);
