import { uniq } from "../helper-functions";
import axiosLastfm from "../apis/lastfm.js";
import disconnect from "../apis/disconnectDiscogs.js";
import { lastfmKeyAndConfig } from "../apiKeys/lastfm.js";

const db = disconnect.database();

export const setUser = (user = "grrtano") => dispatch => {
  console.log("user:" + user);

  dispatch({
    type: "SET_USER",
    payload: user
  });
};

export const setWidth = width => dispatch => {
  dispatch({
    type: "SET_WIDTH",
    payload: width
  });
};

export const fetchSongsAndArtists = () => async (dispatch, getState) => {
  const URIEncodedUser = encodeURIComponent(getState().user);

  const prevMbids = new Set(getState().songs.map(({ mbid }) => mbid));

  // Fetch Songs
  await dispatch(fetchSongs(URIEncodedUser));

  let { songs, artists } = getState();

  // Check for new songs
  let newSongs = songs.filter(({ mbid }) => !prevMbids.has(mbid));
  if (newSongs.length > 0) {
    newSongs.forEach(song => dispatch(fetchCredits(song)));
  }

  // Check for new artists
  const fetchedArtists = uniq(songs.map(({ artist: { "#text": t } }) => t));
  const prevArtistsSet = new Set(artists.map(({ name }) => name));
  const newArtists = fetchedArtists.filter(
    artist => !prevArtistsSet.has(artist)
  );

  if (newArtists.length > 0) {
    newArtists.forEach(artist => dispatch(fetchArtist(artist, URIEncodedUser)));
  }
};

export const fetchSongs = (user = "") => async (dispatch, getState) => {
  const response = await axiosLastfm.get(
    `?method=user.getrecenttracks
		&user=${user}
		&limit=18
		${lastfmKeyAndConfig}`
  );
  // Note: the "limit" in the Last.fm request doesn't count the currently playing track, so splice the results to keep the total count at 18
  dispatch({
    type: "FETCH_SONGS",
    payload: response.data.recenttracks.track.splice(0, 18)
  });
};

export const fetchArtist = (artist = "", user = "") => async dispatch => {
  // Encode properly so special characters like & and / don't break the API request
  let URIEncodedArtist = encodeURIComponent(artist);

  const response = await axiosLastfm.get(
    `?method=artist.getinfo
		&artist=${URIEncodedArtist}
		&user=${user}
		${lastfmKeyAndConfig}`
  );

  dispatch({
    type: "FETCH_ARTIST",
    payload: response.data.artist
  });
};

export const fetchCredits = (song = "") => async (dispatch, getState) => {
  // let currCredit = getState().credits;

  // console.log(song.name);
  // console.log(currCredit);

  await db.search(
    song.name,
    { page: 1, per_page: 1, artist: song.artist["#text"] },
    function(err, data) {
      if (err) throw err;
      if (data.results.length > 0) {
        // console.log('discgos results: ',data.results);
        let response = {
          song: song.name,
          album: song.album["#text"],
          label:
            data.results[0].label.length !== 0
              ? data.results[0].label[0]
              : "N/A",
          uri: data.results[0].uri
        };
        // console.log(response);
        dispatch({
          type: "FETCH_CREDITS",
          payload: response
        });
      } else {
        console.log(
          "No Discogs record for " + song.name + " by " + song.artist["#text"]
        );
      }
    }
  );
};
