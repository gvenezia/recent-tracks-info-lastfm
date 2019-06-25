# What Have You Been Listening to?
This app uses the Last.fm API to fetch your most recently played songs and display them as a list of cards. Each card contains extra information, like artist bio and genre tags from music databases like Last.fm and Discogs. No single music database or streaming service has all of this information, so the main idea for this project is to consolidate relevant information to a single stream.

[Check it out](http://last-fm.gvenezia.com/) (Hosted with [Surge](https://surge.sh/))

### User Stories
- View my (Gaetano's) recent listening history
- View the song, date and time of listen, album, album art, artist, basic bio, artist genres
– Navigate to an album's Discogs page with dynamically populated external links
- View is responsive to screen size
- ~Last.fm users can pull up their recent listening data from last.fm~ (in progress)
- ~Guests can choose from a pre-defined list of usernames~ (in progress)
- ~Guests can see some basic data visualizations of their listening history and artist info~ (in progress)

### To-Do
UI elements:
- Ability to change the view from expanded to collapsed 
- Add user input for username, number of recent songs, etc.
- Add links for all relevant info
- Collapsed/Consolidated cards for repeated artists or albums

Data Viz:
- Visualize the trend of listening over time 
- Provide small pop up visualizations for each song card (ex. how much have you listened to this artist recently? or, How are they trending among all listeners?)

API: 
- Add integration with musicbrainz, allmusic, and other music info databases in order to enrich the info per song/artist (ex. personnel, producers, artist's country)

Testing:
- Smoke tests with Jest

### Tech used
* React
* Redux
* React-redux
* redux-thunk
* npm w/ [axios](https://www.npmjs.com/package/axios), [react-html-parser](https://www.npmjs.com/package/react-html-parser), [lodash](https://lodash.com/)
* [Last.fm API](https://www.last.fm/api/intro)
* Discogs API via [@bartve's library for Node](https://github.com/bartve/disconnect)
* [Semantic UI](https://semantic-ui.com/)
* hidden `.js` file in `src/apiKeys/` for the Last.fm API key and secret
* ~smoke tests for components~ (in progress)
* bootstrapped with [Create React App](https://github.com/facebook/create-react-app) -  See below for relevant scripts

#### [Last.fm API Terms of Service](https://www.last.fm/api/tos)



---  

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
