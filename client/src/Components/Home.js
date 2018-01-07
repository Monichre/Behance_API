import React, { Component } from 'react'
import Axios from 'axios'
import { Constants } from '../constants.js'

export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchActive: false,
            searchTerm: ''
        }
    }
    componentWillMount() {
        Axios.get('/gallery').then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    }
    runSearch(e) {
        e.preventDefault()
        this.setState({
            searchActive: true
        })
    }
    closeSearch(e) {
        e.preventDefault()
        this.setState({
            searchActive: false
        })
    }
    handleSearchInput(e) {
        e.preventDefault()
    }

    render() {
        return (
            <div id="Home">
                <header>
                    <i className="fa fa-bars"></i>
                    <div className="menu">
                        <div className={`search-wrapper ${this.state.searchActive ? 'active' : ''}`}>
                            <div className="input-holder">
                                <input type="text" className="search-input" value={this.state.searchTerm} onChange={this.handleSearchInput.bind(this)} placeholder="Type to search" />
                                <button className="search-icon" onClick={this.runSearch.bind(this)}><span></span></button>
                            </div>
                            <span className="close" onClick={this.closeSearch.bind(this)}></span>
                        </div>
                    </div>
                </header>

                <aside>
                    <h1>Dealer Inspire + Behance</h1>
                    <ul>

                    </ul>
                </aside>

                <div className="dashboard">
                    <canvas id="Chart"></canvas>
                    <div className="row">
                    </div>
                </div>
            </div>
        )
    }

}