import React from 'react'
import PropTypes from 'prop-types'
import './styles/Playlist.css';

import Track from './Track';


class Playlist extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tracks: this.props.tracks,
      side: props.side,
    }
  }

  // tracks will be re-ordered when a track is moved to the top
  reOrderTracks = (trackIndex) => {
    let allTracks = this.state.tracks;
    const removeTrack = allTracks[trackIndex];
    allTracks.splice(trackIndex, 1);
    allTracks.unshift(removeTrack);

    // sets state to reflect the new order of the songs
    this.setState({
      tracks: allTracks,
    });
  }

  render() {
    const { tracks, side } = this.state;

    const calculatePlayTime = (allTracks) => {
      let minutes = 0;
      let seconds = 0;

      allTracks.forEach((track) => {
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
    // sconst allTracks = props.tracks;
    const trackCount = tracks.length;
    const playtime = calculatePlayTime(tracks);
    const trackElements = tracks.map((track, i) => {
      // We use "spread syntax" here to pass in all the properties of 
      // the variable 'track' as props. Go look it up!
      return (
        <Track
          key={track.id}
          // key={i}
          moveToTopCallback={this.reOrderTracks}
          index={i}
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
