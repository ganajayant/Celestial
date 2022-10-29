import axios from "axios";
import { Component } from "react";

import Navbar from "../../Components/Navbar/Navbar";
import "./UserProfile.css";

export default class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = { posts: [], user: {} }
    }
    getData = async () => {
        await axios.get(`http://localhost:5000/user/${window.location.href.split('/')[4]}`).then(e => {
            this.setState({ user: e.data })
        })
        await axios.get(`http://localhost:5000/post/${this.state.user._id}`)
            .then(e => {
                console.log(e);
                this.setState({ posts: e.data })
            })
    };
    componentDidMount() {
        this.getData()
    }
    render() {
        return <div>
            <Navbar user={this.props.user} />
            <header>
                <div className="container" >
                    <div className="profile">
                        <div className="profile-image">
                            <img src={this.state.user.ImageURL} className="rounded-circle" height="100" alt="" loading="lazy" />
                        </div>
                        <div className="profile-user-settings">
                            <h1 className="profile-user-name">{this.state.user.username}</h1>
                            <a href="/editprofile">
                                <button className="btn profile-edit-btn">Edit Profile</button>
                            </a>
                            <a href="/editprofile">
                                <button className="btn profile-settings-btn" aria-label="profile settings"><i className="fas fa-cog" aria-hidden="true"></i></button>
                            </a>
                        </div>
                        <div className="profile-stats">
                            <ul>
                                <li><span className="profile-stat-count">{this.state.posts.length}</span> posts</li>
                                <li><span className="profile-stat-count">188</span> followers</li>
                                <li><span className="profile-stat-count">206</span> following</li>
                            </ul>
                        </div>
                        <div className="profile-bio">
                            <p><span className="profile-real-name">{this.state.user.name}</span> {this.state.user.bio}</p>
                        </div>
                    </div>
                </div>
            </header>
            <main>
                <div className="container">
                    <div className="gallery">
                        {this.state.posts.map(item => {
                            return <div className="gallery-item" tabIndex="0" key={item._id}>
                                <img src={item.ImageURL} className="gallery-image" alt="" />
                                <div className="gallery-item-info">
                                    <ul>
                                        <li className="gallery-item-likes"><span className="visually-hidden">Likes:</span><i className="fas fa-heart" aria-hidden="true"></i> {item.Likes}</li>
                                        <li className="gallery-item-comments"><span className="visually-hidden">Comments:</span><i className="fas fa-comment" aria-hidden="true"></i> 5</li>
                                    </ul>
                                </div>
                            </div>
                        })}
                        {/* <div className="gallery-item" tabIndex="0">
                            <img src="https://images.unsplash.com/photo-1497445462247-4330a224fdb1?w=500&h=500&fit=crop" className="gallery-image" alt="" />
                            <div className="gallery-item-info">
                                <ul>
                                    <li className="gallery-item-likes"><span className="visually-hidden">Likes:</span><i className="fas fa-heart" aria-hidden="true"></i> 89</li>
                                    <li className="gallery-item-comments"><span className="visually-hidden">Comments:</span><i className="fas fa-comment" aria-hidden="true"></i> 5</li>
                                </ul>
                            </div>
                        </div>
                        <div className="gallery-item" tabIndex="0">
                            <img src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=500&h=500&fit=crop" className="gallery-image" alt="" />
                            <div className="gallery-item-type">
                                <span className="visually-hidden">Gallery</span><i className="fas fa-clone" aria-hidden="true"></i>
                            </div>

                            <div className="gallery-item-info">
                                <ul>
                                    <li className="gallery-item-likes"><span className="visually-hidden">Likes:</span><i className="fas fa-heart" aria-hidden="true"></i> 42</li>
                                    <li className="gallery-item-comments"><span className="visually-hidden">Comments:</span><i className="fas fa-comment" aria-hidden="true"></i> 1</li>
                                </ul>
                            </div>
                        </div> */}

                        {/*<div className="gallery-item" tabIndex="0">
                            <img src="https://images.unsplash.com/photo-1502630859934-b3b41d18206c?w=500&h=500&fit=crop" className="gallery-image" alt="" />
                            <div className="gallery-item-type">
                                <span className="visually-hidden">Video</span><i className="fas fa-video" aria-hidden="true"></i>
                            </div>
                            <div className="gallery-item-info">
                                <ul>
                                    <li className="gallery-item-likes"><span className="visually-hidden">Likes:</span><i className="fas fa-heart" aria-hidden="true"></i> 38</li>
                                    <li className="gallery-item-comments"><span className="visually-hidden">Comments:</span><i className="fas fa-comment" aria-hidden="true"></i> 0</li>
                                </ul>
                            </div>
                        </div>

                        <div className="gallery-item" tabIndex="0">

                            <img src="https://images.unsplash.com/photo-1498471731312-b6d2b8280c61?w=500&h=500&fit=crop" className="gallery-image" alt="" />

                            <div className="gallery-item-type">

                                <span className="visually-hidden">Gallery</span><i className="fas fa-clone" aria-hidden="true"></i>

                            </div>

                            <div className="gallery-item-info">

                                <ul>
                                    <li className="gallery-item-likes"><span className="visually-hidden">Likes:</span><i className="fas fa-heart" aria-hidden="true"></i> 47</li>
                                    <li className="gallery-item-comments"><span className="visually-hidden">Comments:</span><i className="fas fa-comment" aria-hidden="true"></i> 1</li>
                                </ul>

                            </div>

                        </div>

                        <div className="gallery-item" tabIndex="0">

                            <img src="https://images.unsplash.com/photo-1515023115689-589c33041d3c?w=500&h=500&fit=crop" className="gallery-image" alt="" />

                            <div className="gallery-item-info">

                                <ul>
                                    <li className="gallery-item-likes"><span className="visually-hidden">Likes:</span><i className="fas fa-heart" aria-hidden="true"></i> 94</li>
                                    <li className="gallery-item-comments"><span className="visually-hidden">Comments:</span><i className="fas fa-comment" aria-hidden="true"></i> 3</li>
                                </ul>

                            </div>

                        </div>

                        <div className="gallery-item" tabIndex="0">

                            <img src="https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=500&h=500&fit=crop" className="gallery-image" alt="" />

                            <div className="gallery-item-type">

                                <span className="visually-hidden">Gallery</span><i className="fas fa-clone" aria-hidden="true"></i>

                            </div>

                            <div className="gallery-item-info">

                                <ul>
                                    <li className="gallery-item-likes"><span className="visually-hidden">Likes:</span><i className="fas fa-heart" aria-hidden="true"></i> 52</li>
                                    <li className="gallery-item-comments"><span className="visually-hidden">Comments:</span><i className="fas fa-comment" aria-hidden="true"></i> 4</li>
                                </ul>

                            </div>

                        </div>

                        <div className="gallery-item" tabIndex="0">

                            <img src="https://images.unsplash.com/photo-1515814472071-4d632dbc5d4a?w=500&h=500&fit=crop" className="gallery-image" alt="" />

                            <div className="gallery-item-info">

                                <ul>
                                    <li className="gallery-item-likes"><span className="visually-hidden">Likes:</span><i className="fas fa-heart" aria-hidden="true"></i> 66</li>
                                    <li className="gallery-item-comments"><span className="visually-hidden">Comments:</span><i className="fas fa-comment" aria-hidden="true"></i> 2</li>
                                </ul>

                            </div>

                        </div>

                        <div className="gallery-item" tabIndex="0">

                            <img src="https://images.unsplash.com/photo-1511407397940-d57f68e81203?w=500&h=500&fit=crop" className="gallery-image" alt="" />

                            <div className="gallery-item-type">

                                <span className="visually-hidden">Gallery</span><i className="fas fa-clone" aria-hidden="true"></i>

                            </div>

                            <div className="gallery-item-info">

                                <ul>
                                    <li className="gallery-item-likes"><span className="visually-hidden">Likes:</span><i className="fas fa-heart" aria-hidden="true"></i> 45</li>
                                    <li className="gallery-item-comments"><span className="visually-hidden">Comments:</span><i className="fas fa-comment" aria-hidden="true"></i> 0</li>
                                </ul>

                            </div>

                        </div>

                        <div className="gallery-item" tabIndex="0">

                            <img src="https://images.unsplash.com/photo-1518481612222-68bbe828ecd1?w=500&h=500&fit=crop" className="gallery-image" alt="" />

                            <div className="gallery-item-info">

                                <ul>
                                    <li className="gallery-item-likes"><span className="visually-hidden">Likes:</span><i className="fas fa-heart" aria-hidden="true"></i> 34</li>
                                    <li className="gallery-item-comments"><span className="visually-hidden">Comments:</span><i className="fas fa-comment" aria-hidden="true"></i> 1</li>
                                </ul>

                            </div>

                        </div>

                        <div className="gallery-item" tabIndex="0">

                            <img src="https://images.unsplash.com/photo-1505058707965-09a4469a87e4?w=500&h=500&fit=crop" className="gallery-image" alt="" />

                            <div className="gallery-item-info">

                                <ul>
                                    <li className="gallery-item-likes"><span className="visually-hidden">Likes:</span><i className="fas fa-heart" aria-hidden="true"></i> 41</li>
                                    <li className="gallery-item-comments"><span className="visually-hidden">Comments:</span><i className="fas fa-comment" aria-hidden="true"></i> 0</li>
                                </ul>

                            </div>

                        </div>

                        <div className="gallery-item" tabIndex="0">

                            <img src="https://images.unsplash.com/photo-1423012373122-fff0a5d28cc9?w=500&h=500&fit=crop" className="gallery-image" alt="" />

                            <div className="gallery-item-type">

                                <span className="visually-hidden">Video</span><i className="fas fa-video" aria-hidden="true"></i>

                            </div>

                            <div className="gallery-item-info">

                                <ul>
                                    <li className="gallery-item-likes"><span className="visually-hidden">Likes:</span><i className="fas fa-heart" aria-hidden="true"></i> 30</li>
                                    <li className="gallery-item-comments"><span className="visually-hidden">Comments:</span><i className="fas fa-comment" aria-hidden="true"></i> 2</li>
                                </ul>

                            </div>

                        </div> */}

                    </div>
                    {/* <div className="loader"></div> */}
                </div>

            </main >
        </div >
    }
}

