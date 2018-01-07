import React, { Component } from 'react'

export default class Profile extends Component {
    render() {
        return (
            <div className="profile">

                <div className="profile-content">

                    <div className="profile-header">

                        <div className="profile-header__search">
                            <input type="search" placeholder="Search..." />
                        </div>

                        <div className="profile-header__new"></div>
                    </div>

                    <div className="profile-content__panel" data-panel-id="home">
                        <p>Home</p>
                    </div>

                    <div className="profile-content__panel profile-content__panel--active" data-panel-id="my_trip">

                        <div className="profile-list">

                            <div className="profile-list__item" data-item-id="kulon_progo">

                                <h2></h2>
                                <span></span>

                                <div className="profile-list__avatar"><img src="http://placehold.it/31/95BFBF/FFF" /></div>
                            </div>

                            <div className="profile-list__item profile-list__item--active" data-item-id="bromo">

                                <h2></h2>
                                <span></span>

                                <div className="profile-list__avatar"><img /></div>

                                <div className="profile-list__avatar"><img /></div>
                            </div>
                        </div>
                    </div>

                    <div className="profile-content__panel" data-panel-id="discover_places">
                        <p>Discover Items</p>
                    </div>

                    <div className="profile-content__panel" data-panel-id="notifications">
                        <p>Notifications</p>
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
        )
    }
}