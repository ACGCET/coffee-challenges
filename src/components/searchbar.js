import React, { Component } from 'react'
import { AiOutlineSearch } from "react-icons/ai";
import './search.css';
class SearchBar extends Component {

    _onKeydown = (e) => {
        if (e.key === 'Enter') {
            this.props.filterLabels((this.props.searchValue).toLowerCase(), true)
        }
    }
    onInputchange = (e) => {
        this.props.setSearchValue(e.target.value)
    }
    render () {

        return (
            <div>
                <span className="searchIcon"><AiOutlineSearch /></span>
                <input className="searchInput" type="text" placeholder="Search all labels" value={this.props.searchValue} onChange={this.onInputchange} onKeyDown={this._onKeydown}></input>
            </div>
        )
    }
}

export default SearchBar
