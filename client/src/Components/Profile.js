import React, { Component } from 'react'
import { Card, Icon, Image, List, Divider } from 'semantic-ui-react'
import Axios from 'axios'


export default class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            first_name: '',
            last_name: '',
            fields: [],
            images: [],
            occupation: '',
            location: '',
            social_links: [],
            stats: {},
            website: '',
            features: [],
            sections: [],
            active_section: 'home'
        }
    }
    componentWillMount() {

        const user_id = this.props.match.params.user
        const _this = this

        Axios.get('/get-user', {
            params: {
                user_id: user_id
            }
        }).then((response) => {

            const { first_name, last_name, fields, images, sections, features, occupation, location, social_links, stats, website } = response.data

            _this.setState({
                first_name: first_name,
                last_name: last_name,
                fields: fields,
                images: images,
                occupation: occupation,
                location: location,
                social_links: social_links,
                stats: stats,
                website: website,
                features: features,
                sections: sections
            })

        }).catch((error) => {
            console.log(error)
        })
    }

    render() {

        return (
            <div className='profile_container'>
                <div className="profile">
                    <div className="profile-sidebar">
                        <div className="profile-sidebar__brand">
                            <Image circular='true' size='mini' src={this.state.images['50']} />
                            <br />
                            {this.state.first_name} {this.state.last_name}
                        </div>
                        <div className="profile-nav">
                            <h1>Projects</h1>
                            <ul>
                                {this.state.features.map((feature) => (
                                    <li className="profile-nav__item profile-nav__item--selected"><a>{feature.site.name}</a></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="profile-content">
                        <div className="profile-header">
                            <h2>{this.state.fields.map((field) => (<span> {field} </span>))}</h2>
                            <span>{this.state.sections.About}</span>
                        </div>
                        <div className="profile-content__panel profile-content__panel--active">
                            <div className="profile-list">
                                <div className="profile-list__item profile-list__item--active">
                                    <h2></h2>
                                    <span></span>
                                    <div className="profile-list__avatar"><img /></div>
                                    <div className="profile-list__avatar"><img /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="profile-preview">

                        <div className="profile-preview__panel" data-panel-id="kulon_progo">

                            <div className="profile-preview__header">
                                <h2> </h2>
                                <h3><span></span>
                                </h3>
                            </div>

                            <div className="profile-preview__content">
                                <section>
                                    <h2>My Inspiration</h2>
                                    <label>

                                    </label>
                                    <label>

                                    </label>
                                    <label>

                                    </label>
                                </section>
                                <section>

                                </section>
                                <section>
                                    <h2></h2>
                                    <div className="progress-bar">


                                    </div>
                                </section>
                            </div>
                        </div>

                        <div className="profile-preview__panel profile-preview__panel--active" data-panel-id="bromo">

                            <div className="profile-preview__header">
                                <h2></h2>
                                <h3>21<span>C</span>
                                </h3>
                            </div>

                            <div className="profile-preview__content">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}