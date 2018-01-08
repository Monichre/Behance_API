import React from 'react'
import {Link} from 'react-router-dom'
import { Card, Icon, Image, List } from 'semantic-ui-react'

export const Search = (props) => (
    <div style={props.style} className='search-content'>
        <h1>Search Results</h1>
        <div className='results-column'>
            {
                props.searchResults.map((result) => (
                    <div className='searchResult'>
                        <Link to={`/profile/${result.id}`}>
                            <List horizontal>
                                <List.Item>
                                    <Image src={result.images['50']} circular={true} size='mini' /> {result.display_name}
                                </List.Item>
                            </List>
                        </Link>
                    </div>
                ))
            }
        </div>
    </div>
)