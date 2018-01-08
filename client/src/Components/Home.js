import React, { Component } from 'react'
import Axios from 'axios'
import { Card, Icon, Image, List, Divider } from 'semantic-ui-react'
import { Constants } from '../constants.js'

export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchActive: false,
            searchTerm: '',
            items: [],
            fields: []
        }
    }
    componentWillMount() {
        const _this = this
        Axios.get('/gallery').then((response) => {
            let items = response.data.gallery.splice(0, 20)
            let fields = response.data.field_data.splice(0, 20)
            console.log(response)
            console.log(fields)
            _this.setState({
                items: items,
                fields: fields
            })
        }).catch((error) => {
            console.log(error)
        })
    }
    componentDidMount() {
        console.log(this.state.items)
    }
    runSearch() {
        const _this = this
        
        Axios.post('/search', {
            data: _this.state.searchTerm
        }).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
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
        return (
            <div id="Home">
                <header>
                    <i className="fa fa-bars"></i>
                    <div className="menu">
                        <div className={`search-wrapper ${this.state.searchActive ? 'active' : ''}`}>
                            <div className="input-holder">
                                <input type="text" className="search-input" value={this.state.searchTerm} onChange={this.handleSearchInput.bind(this)} placeholder="Type to search" onKeyDown={this.handleKeyPress.bind(this)}/>
                                <button className="search-icon" onClick={this.runSearch.bind(this)}><span></span></button>
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
                    {/* <canvas id="Chart"></canvas> */}
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