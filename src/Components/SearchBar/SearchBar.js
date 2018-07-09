import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {searchTerm: ''}

        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.onClick = this.search;
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    search() {
        this.props.onSearch(this.state.searchTerm);
    }
    handleTermChange(event) {
        this.setState({searchTerm: event.target.value});
    }
    handleKeyPress(event) {
        if (event.key === 'Enter') {
            console.log('Key has been pressed');
            return this.props.onSearch(this.state.searchTerm);
        }
    }
    render() {
        return (
            <div className="SearchBar">
                <input onChange={this.handleTermChange} onKeyPress={this.handleKeyPress} placeholder="Enter A Song, Album, or Artist" />
                <a onClick={this.onClick}>SEARCH</a>
            </div>
        );
    }
}

export default SearchBar;