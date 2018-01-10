import React from 'react'
import { Image, List } from 'semantic-ui-react'

export const Search = (props) => (
    <div style={props.style} className='search-content'>
        <h1>Search Results</h1>
        <div className='results-column'>
            {
                props.searchResults.map((result, i) => (
                    <div key={'searchResult-' + i } className='searchResult'>
                        <a href={`/profile/${result.id}`}>
                            <List horizontal>
                                <List.Item>
                                    <Image src={result.images['50']} circular={true} size='mini' /> {result.display_name}
                                </List.Item>
                            </List>
                        </a>
                    </div>
                ))
            }
        </div>
    </div>
)