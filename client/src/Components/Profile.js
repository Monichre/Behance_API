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
            projects: [],
            sections: [],
            // active_project: false
        }
    }
    shouldComponentUpdate() {
        return true
    }
    componentWillMount() {

        const user_id = this.props.match.params.user
        const _this = this

        Axios.get('/get-user', {
            params: {
                user_id: user_id
            }
        }).then((response) => {
            
            const { first_name, last_name, fields, images, sections, occupation, location, social_links, stats, website } = response.data.user_data
            const { projects, followers, following, work_experience } = response.data
            
            
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
        return 
        
    }

    render() {
        // console.log(this.state)
        // let image_bg
        // if (this.state.active_project) {
        //     let img_src = this.renderBackgroundImage()
        //     image_bg = <Image src={img_src.covers['230']} />
        // }
        // console.log(image_bg)
        console.log(this.state.active_project)
        console.log(this.state.projects)
        // this.state.projects.find((project) => project.id === this.state.active_project)

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
                                        <h2><img src={project.features[0].site.ribbon.image} /> {project.name}</h2>
                                        <List horizontal>
                                            {this.state.social_links.map((link) => (
                                                <List.Item className='stat'><span><a href={link.url}>{link.service_name}</a></span> </List.Item> 
                                            ))}
                                        </List>
                                        <List horizontal>
                                            {project.fields.map((field) => ( <List.Item className='stat'><span>{field}</span> </List.Item> ))}
                                        </List>
                                        <div className="profile-list__avatar">
                                            
                                        </div>
                                        
                                        <div>
                                            <Image src={project.covers['230']} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        
                    </div>
                    <div className="profile-preview">
                        <div className="profile-preview__panel profile-preview__panel--active" style={{ backgroundImage: `url(${this.state.images['276']})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'top right' }}>
                            <div className="profile-preview__header">
                                
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