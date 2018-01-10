import React, { Component } from 'react'
import { Card, Icon, Image, List, Divider } from 'semantic-ui-react'
import Axios from 'axios'
import {Loader} from '../Partials/Loader'

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
            projects: [],
            sections: [],
            active_project: null,
            data_ready: false
        }


    }

    componentWillMount() {

        const user_id = this.props.match.params.user_id
        const _this = this

        Axios.get('/get-user', {
            params: {
                user_id: user_id
            }
        }).then((response) => {

            const { first_name, last_name, fields, images, sections, occupation, location, social_links, stats, website } = response.data.user_data
            const { projects, work_experience } = response.data
            let { followers, following } = response.data

            followers = followers.splice(0, 4)
            following = following.splice(0, 4)


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
                projects: projects,
                followers: followers,
                following: following,
                sections: sections,
                work_experience: work_experience,
                active_project: projects[0].id
            })

        }).catch((error) => {
            console.log(error)
        })
    }

    setActiveProject(project) {
        console.log(project)
        this.setState({
            active_project: project
        })
    }
    renderBackgroundImage() {
        return this.state.projects.find((project) => project.id === this.state.active_project)

    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                data_ready: true
            })
        })
    }

    render() {

        let image_bg
        if (this.state.active_project) {
            let img_src = this.renderBackgroundImage()
            image_bg = <Image src={img_src.covers['230']} />
        }
    


        if (this.state.data_ready) {
            return (
                <div className='profile_container'>
                    <div className="profile">
                        <div className="profile-sidebar">
                            <div className="profile-sidebar__brand">
                                <Image circular='true' size='mini' src={this.state.images['50']} />
                                <br />
                                {this.state.first_name} {this.state.last_name}
                                <br />
                                <b>{this.state.occupation}</b>
                                <br />
                                {this.state.website}
                            </div>
                            <div className="profile-nav">
                                <h1>Projects</h1>
                                <ul>
                                    {this.state.projects.map((project, i) => (
                                        <li key={i} className={`profile-nav__item ${project.id === this.state.active_project ? 'profile-nav__item--selected' : ''}`}><a onClick={this.setActiveProject.bind(this, project.id)}>{project.name}</a></li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="profile-content">
                            <div className="profile-header">
                                <h2>{this.state.fields.map((field) => (<span> {field} </span>))}</h2>
                                <span>{this.state.sections.About}</span>
                            </div>
                            {this.state.projects.map((project, i) => (
                                <div key={i} className={`profile-content__panel ${project.id === this.state.active_project ? 'profile-content__panel--active' : ''}`}>
                                    <div className="profile-list">
                                        <div className="profile-list__item profile-list__item--active">
                                            <h2><img src={project.features ? project.features[0].site.ribbon.image : null} /> {project.name}</h2>
                                            <List horizontal className='profile_social_links'>
                                                {this.state.social_links.map((link) => (
                                                    <List.Item className='stat'><span><a href={link.url}>{link.service_name}</a></span> </List.Item>
                                                ))}
                                            </List>
                                            <List horizontal className='fields'>
                                                {project.fields.map((field) => (<List.Item className='stat'><span>{field}</span> </List.Item>))}
                                            </List>
                                  
                                            <div>
                                                <a href={project.url}>
                                                    <Image src={project.covers['230']} />
                                                </a>
                                            </div>

                                        </div>
                                        <List horizontal className="stats_list">
                                                {Object.keys(this.state.stats).splice(0, 4).map((stat) => (
                                                    <List.Item className='stat'> <span>{stat}:</span> {this.state.stats[stat]} </List.Item>
                                                ))}
                                            </List>
                                    </div>
                                </div>
                            ))}

                        </div>
                        <div className="profile-preview">
                            <div className="profile-preview__panel profile-preview__panel--active" style={{ backgroundImage: `url(${this.state.images['138']})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'top right' }}>
                                <div className="profile-preview__header">
                                    <div className="profile-nav">
                                        <div>
                                            <h1>Following</h1>
                                            <List className='following'>
                                                {this.state.following ? this.state.following.map(followed =>
                                                    <List.Item >
                                                        <Image src={followed.images['50']} circular={true} size='mini' avatar={true} verticalAlign='top' /> <span>{followed.first_name} {followed.first_name}</span>
                                                    </List.Item>)

                                                    : null}
                                            </List>
                                        </div>
                                        <div>
                                            <h1>Followers</h1>
                                            <List className='followers'>
                                                {this.state.followers ? this.state.followers.map(follower =>
                                                    <List.Item className='stat'>
                                                        <Image src={follower.images['50']} circular={true} size='mini' avatar={true} verticalAlign='top' /> <span>{follower.first_name} {follower.first_name}</span>
                                                    </List.Item>)

                                                    : null}
                                            </List>
                                        </div>
                                    </div>
                                </div>
                                <Divider />
                                <div className="profile-preview__content work_experience">
                                    <section>
                                        <h2>Work Experience</h2>
                                        <List>
                                            {(this.state.work_experience && this.state.work_experience.length > 0) ? this.state.work_experience.map((work_item) => (
                                                <List.Item className='stat'> <b>{work_item.position}</b> at <b>{work_item.organization},</b> {work_item.location} <i>{work_item.start_date}-{work_item.end_date}</i> </List.Item>
                                            )) :

                                                null

                                            }
                                        </List>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <Loader />
        }
    }
}