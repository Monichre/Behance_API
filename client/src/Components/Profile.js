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
            active_feature: ''
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
                sections: sections,
                active_feature: features[0].site.name
            })

        }).catch((error) => {
            console.log(error)
        })
    }
    setActiveFeature(feature) {
        console.log(feature)
        this.setState({
            active_feature: feature
        })
    }
    renderBackgroundImage() {
        return this.state.features.find((feature) => feature.site.name === this.state.active_feature)
    }

    render() {
        console.log(this.state)
        let image_bg
        if (this.state.active_feature) {
            image_bg = this.renderBackgroundImage().site.ribbon.image
        }

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
                                {this.state.features.map((feature, i) => (
                                    <li key={i} className={`profile-nav__item ${feature.site.name === this.state.active_feature ? 'profile-nav__item--selected' : ''}`}><a onClick={this.setActiveFeature.bind(this, feature.site.name)}>{feature.site.name}</a></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="profile-content">
                        <div className="profile-header">
                            <h2>{this.state.fields.map((field) => (<span> {field} </span>))}</h2>
                            <span>{this.state.sections.About}</span>
                        </div>
                        {this.state.features.map((feature, i) => (
                            <div key={i} className={`profile-content__panel ${feature.site.name === this.state.active_feature ? 'profile-content__panel--active' : ''}`}>
                                <div className="profile-list">
                                    <div className="profile-list__item profile-list__item--active">
                                        <h2>{feature.site.name}</h2>
                                        <div className="profile-list__avatar">
                                            <img src={feature.site.icon} />
                                            <span>{feature.site.url}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                    <div className="profile-preview">
                        <div className="profile-preview__panel profile-preview__panel--active" style={{ backgroundImage: `url(${this.state.images['276']})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'top right' }}>
                            <div className="profile-preview__header">
                                <Image src={image_bg} />
                                <List>
                                    {Object.keys(this.state.stats).map((stat) => (
                                        <List.Item className='stat'> <span>{stat}:</span> {this.state.stats[stat]} </List.Item>
                                    ))}
                                </List>
                            </div>
                            <div className="profile-preview__content">
                                <section>
                                    <h2>Links</h2>
                                    <h2>{this.state.website}</h2>
                                    {this.state.social_links.map((link) => (
                                        <label>
                                            {link.service_name}:<span>{link.url}</span>
                                        </label>
                                    ))}
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}