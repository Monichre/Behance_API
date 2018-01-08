import React from 'react'
import { Route } from 'react-router-dom'
import Home from './Components/Home'
import Profile from './Components/Profile'

let route_paths = [
    {
        path: '/',
        exact: true,
        component: Home
    },
    {
        path: '/profile/:user',
        exact: true,
        component: Profile
    }
]
const the_routes = (
    <div>
        {route_paths.map((route, i) => (
            <Route exact path={route.path} key={'route' + i}  render={(props) => (
                <route.component key={i} {...props} />
            )} />
        ))}
    </div>
)

export const Constants = {
    routes: the_routes,
    URLS: {
        root: 'https://api.behance.net/featured',
        collections: 'https://api.behance.net/v2/collections',
        users: 'https://api.behance.net/v2/users',
        projects: 'https://api.behance.net/v2/projects',
        fields: 'https://api.behance.net/v2/fields'
    }
}