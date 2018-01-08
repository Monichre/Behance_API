import React, { Component } from 'react'
import Axios from 'axios'
import { Card, Icon, Image, List, Divider } from 'semantic-ui-react'
import { Search } from '../Partials/Search'
import { Constants } from '../constants.js'

export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchActive: false,
            searchTerm: '',
            items: [],
            fields: [],
            searchResults: [],
            searchCompleted: false
        }
    }
    componentWillMount() {
        const _this = this
        Axios.get('/gallery').then((response) => {
            let items = response.data.gallery.splice(0, 20)
            let fields = response.data.field_data.splice(0, 20)
            _this.setState({
                items: items,
                fields: fields
            })
        }).catch((error) => {
            console.log(error)
        })
    }
    startSearch() {
        this.setState({
            searchActive: true
        })
    }
    runSearch() {
        const _this = this
        
        Axios.post('/search', {
            data: _this.state.searchTerm
        }).then((response) => {
            _this.setState({
                searchResults: response.data,
                searchCompleted: true

            }, () => {
                console.log(this.state)
            })
        }).catch((error) => {
            console.log(error)
        })
    }
    closeSearch(e) {
        e.preventDefault()
        this.setState({
            searchActive: false,
            searchCompleted: false
        })
    }
    handleSearchInput(e) {
        e.preventDefault()
        this.setState({
            searchTerm: e.target.value
        }, ()=> {
            console.log(this.state)
        })
    }
    handleKeyPress(e) {
       if (e.which === 13) {
        console.log("you pressed enter")
        this.runSearch()
       }
    }

    render() {
        let search_results_style
        if (this.state.searchCompleted) {
            search_results_style = {
                display: 'flex'
            }
        } else {
            search_results_style = {
                display: 'none'
            }
        }
        return (
            <div id="Home">
                <header>
                    <i className="fa fa-bars"></i>
                    <div className="menu">
                        <div className={`search-wrapper ${this.state.searchActive ? 'active' : ''}`}>
                            <div className="input-holder">
                                <input type="text" className="search-input" value={this.state.searchTerm} onChange={this.handleSearchInput.bind(this)} placeholder="Type to search" onKeyDown={this.handleKeyPress.bind(this)}/>
                                <button className="search-icon" onClick={this.startSearch.bind(this)}><span></span></button>
                            </div>
                            <span className="close" onClick={this.closeSearch.bind(this)}></span>
                        </div>
                    </div>
                </header>

                <aside>
                    <h1>Dealer Inspire + Behance</h1>
                    <ul>
                        {this.state.fields.map((field) => (
                            <li>{field.name}</li>
                        ))}
                    </ul>
                </aside>

                <div className="dashboard">
                    <Search style={search_results_style} searchResults={this.state.searchResults} />
                    <Card.Group>
                        {this.state.items.map((item) => (
                            <Card>
                                <Image className="main_image" src={item.project_covers.length > 0 ? item.project_covers[0].url : ''} />
                                <Card.Content>
                                    <Card.Header>{item.title}</Card.Header>
                                    <Divider />
                                    <Card.Meta><Image src={item.multiple_owners === false ? item.owners[0].images['50'] : ''} circular={true} size='mini' /> {item.multiple_owners === false ? item.owners[0].first_name : ''} {item.multiple_owners === false ? item.owners[0].last_name : ''}: {item.multiple_owners === false ? item.owners[0].city : ''}, {item.multiple_owners === false ? item.owners[0].country : ''}</Card.Meta>
                                </Card.Content>
                                <Card.Content extra>
                                    <List horizontal>
                                        <List.Item icon='user' content={`Followers: ${item.follower_count}`} />
                                        <List.Item icon='tasks' content={`Projects ${item.project_count}`} />
                                    </List>
                                </Card.Content>
                            </Card>
                        ))}
                    </Card.Group>
                </div>
            </div>
        )
    }

}