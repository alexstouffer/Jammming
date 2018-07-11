import React from 'react';
import './Playlist.css';

import TrackList from '../TrackList/TrackList';


class Playlist extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    handleNameChange(event) {
        this.props.onNameChange(event.target.value);
    }
    handleKeyPress(event) {
        if (event.key === 'Enter'){
            console.log('Key has been pressed');
            this.props.onSave();
        }
    }
    render() {
        return (
            <div className="Playlist">
                <input onChange={this.handleNameChange} value={this.props.playlistName} onKeyPress={this.handleKeyPress}/>
                <TrackList onRemove={this.props.onRemove} 
                tracks={this.props.playlistTracks}
                isRemoval={true}/>
                <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
            </div>
        );
    }
}

export default Playlist;
