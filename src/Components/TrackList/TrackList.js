import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
    render() {
        return (
            <div className="TrackList">
                {
                    this.props.tracks &&
                    this.props.tracks.map(track => {
                        return <Track onAdd={this.props.onAdd} 
                                onRemove={this.props.onRemove} 
                                track={track} 
                                key={track.id}
                                isRemoval={this.props.isRemoval}/>
                    })
                }
            </div>
        );
    }
}

export default TrackList;