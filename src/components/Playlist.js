import React from 'react'
import PropTypes from 'prop-types'
import './styles/Playlist.css';

import Track from './Track';


class Playlist extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      // initial order of tracks
      tracks: this.props.tracks,
    }
  }
  // tracks will be re-ordered when a track is moved to the top
  reOrderTracks = (track_index) => {
    let tracks = this.state.tracks;
    // removes track that is at track_index and moves it and saves it in the track variable
    const track = tracks.splice(track_index, 1)[0];

    // adds track to the beginning of the array (playlist)
    tracks.unshift(track);

    // sets state to reflect the new order of the songs
    this.setState({
      tracks: tracks
    });
  }

  calculatePlayTime = (tracks) => {
    let minutes = 0;
    let seconds = 0;
    tracks.forEach((track) => {
      const times = track.playtime.split(':');
      minutes += parseInt(times[0]);
      seconds += parseInt(times[1]);
    });
  
    minutes += Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
  
    seconds %= 60;
    minutes %= 60;
  
    seconds = ("" + seconds).padStart(2, "0");
    minutes = ("" + minutes).padStart(2, "0");
  
    return `${hours}:${minutes}:${seconds}`;
  }
  render() {
    const tracks = this.state.tracks;
    const trackCount = tracks.length;
    const playtime = this.calculatePlayTime(tracks);
    const trackElements = tracks.map((track, i) => {
      // We use "spread syntax" here to pass in all the properties of 
      // the variable 'track' as props. Go look it up!
      return (
        <Track
          //key={track.id}
          key={i}
          index={i}
          moveToTopCallback={this.reOrderTracks}
          {...track}
  
        />
      );
    });
    return (
      <div className="playlist">
        <h2>{this.props.side} Playlist</h2>
        <p>
          {trackCount} tracks - {playtime}
        </p>
        <ul className="playlist--track-list">
          {trackElements}
        </ul>
      </div>
    );
  }

}

Playlist.propTypes = {
  tracks: PropTypes.array,
  side: PropTypes.string,
}

export default Playlist;
