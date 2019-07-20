import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../index.css';

class Links extends Component{
	render(){
		// Helper function to test whether a property exists
		const exists = x => typeof x !== 'undefined';

		const {artist, url, creditObj} = this.props;

		return (
			<nav className="content">
				<p>
					External Links: &nbsp;
				    <a target="_blank"
				    	rel="noopener noreferrer"
				    	href={"https://www.discogs.com/" + (exists(creditObj) ? creditObj.uri : '')}>
				    	<img className="link-icons"
				    		title="Link to album page on Discogs" 
				    		style={{verticalAlign: "baseline"}}
					    	src="discogs-vinyl.svg"
					    	alt="discogs-icon"/>
			    	</a> &nbsp;
			    	<a target="_blank"
				    	rel="noopener noreferrer"
				    	href={url}>
				    	<i className="large lastfm icon red"
				    		title="Link to song's Last.fm page"
				    		style={{transform: "translate(0,-.11em)"}}></i>
			    	</a> 
			    	<a target="_blank"
				    	rel="noopener noreferrer"
				    	href={"https://en.wikipedia.org/wiki/" + encodeURIComponent(artist) }>
				    	<img className="link-icons wiki-icon"
				    		title="Link to artist's wiki page" 
				    		style={{verticalAlign: "top"}}
					    	src="Wiki_W.svg"
					    	alt="wiki-icon"/>
			    	</a>
		    	</p>
			</nav>
		)	
	}
}

export default connect()(Links);