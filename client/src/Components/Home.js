import React, { Component } from 'react'
import Axios from 'axios'
import { Card, Icon, Image, List, Divider } from 'semantic-ui-react'
import { Search } from '../Partials/Search'


export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchActive: false,
            searchTerm: '',
            searchResults: [],
            searchCompleted: false
        }
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

            })
        }).catch((error) => {
            console.log(error)
        })
    }
    closeSearch() {
        this.setState({
            searchActive: false,
            searchCompleted: false
        })
    }
    handleSearchInput(e) {
        e.preventDefault()
        this.setState({
            searchTerm: e.target.value
        })
    }
    handleKeyPress(e) {
       if (e.which === 13) {
        this.runSearch()
       }
    }
    filterCardCategory(category) {
        console.log(category)
        this.props.filterCategory(category)
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
                        {this.props.fields.map((field, i) => (
                            <li key={'category-' + i} onClick={this.filterCardCategory.bind(this, field.name)}>{field.name}</li>
                        ))}
                    </ul>
                </aside>

                <div className="dashboard">
                    <Search style={search_results_style} searchResults={this.state.searchResults} />
                    <Card.Group>
                        {this.props.items.map((item) => (
                            <Card>
                                <Image className="main_image" src={(item.project_covers && item.project_covers.length > 0) ? item.project_covers[0].url : ''} />
                                <Card.Content>
                                    <Card.Header>{item.title}</Card.Header>
                                    <Divider />
                                    <Card.Meta><Image src={item.multiple_owners === false ? item.owners[0].images['50'] : ''} circular={true} size='mini' /> <b>{item.multiple_owners === false ? item.owners[0].first_name : ''} {item.multiple_owners === false ? item.owners[0].last_name : ''}:</b> {item.multiple_owners === false ? item.owners[0].city : ''}, {item.multiple_owners === false ? item.owners[0].country : ''}</Card.Meta>
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