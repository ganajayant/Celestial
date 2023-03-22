import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../Components/Navbar/Navbar";
import "./UserProfile.css";

export default class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = { posts: [], user: '', followers: [] }
    }
    async componentDidMount() {
        await axios.get(`http://localhost:5000/user/${window.location.pathname.split('/')[2]}`, {
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        }).then(e => {
            this.setState({ user: e.data, followers: e.data.followers })
        })
        if (this.state.user !== '') {
            await axios.get(`http://localhost:5000/post/${this.state.user._id}`, {
                headers: {
                    "auth-token": localStorage.getItem('token')
                }
            })
                .then(e => {
                    console.log(e);
                    this.setState({ posts: e.data })
                })
        }
    }
    componentDidUpdate(prevprops) {
        if (prevprops.user !== this.props.user) {
            this.componentDidMount()
        }
    }
    render() {
        return <div>
            <Navbar user={this.props.user} />
            <header>
                <div className="container" >
                    <div className="profile">
                        <div className="profile-image">
                            <img src={this.state.user.ImageURL} className="rounded-circle" height="100" style={{ height: "200px", width: "200px" }} alt="" />
                        </div>
                        <div className="profile-user-settings">
                            <h1 className="profile-user-name">{this.state.user.username}</h1>
                            <a href="/editprofile">
                                <button className="btn profile-edit-btn" onClick={async (e) => {
                                    e.preventDefault();
                                    axios.put(`http://localhost:5000/user/updatefollow/${this.state.user._id}`, {
                                        followedBy: this.props.user._id,
                                        follows: this.state.user?.followers?.includes(this.props.user._id)
                                    }, {
                                        headers: {
                                            "auth-token": localStorage.getItem('token')
                                        }
                                    })
                                    if (this.state?.followers?.includes(this.props.user._id)) {
                                        this.setState({ followers: this.state.followers.filter((x) => x !== this.props.user._id) })
                                    } else {
                                        this.setState({ followers: [...this.state.followers, this.props.user._id] })
                                    }
                                }
                                }> {this.state?.followers?.includes(this.props.user._id) && <>following</>}{!this.state?.followers?.includes(this.props.user._id) && <>follow</>}</button>
                            </a>
                        </div>
                        <div className="profile-stats">
                            <ul>
                                <li><span className="profile-stat-count">{this.state.posts?.length}</span> posts</li>
                                <li><span className="profile-stat-count">followers</span> {this.state?.followers?.length}</li>
                                <li><span className="profile-stat-count">following</span> {this.state.user?.following?.length}</li>
                            </ul>
                        </div>
                        <div className="profile-bio">
                            <p><span className="profile-real-name">{this.state.user.name}</span> {this.state.user.bio}</p>
                        </div>
                    </div>
                </div>
            </header >
            <main>
                <div className="container">
                    <div className="gallery">
                        {this.state.posts.map(item => {
                            return <Link to={`/p/${item._id}`} key={item._id}>
                                <div className="gallery-item" tabIndex="0" >
                                    <img src={item.ImageURL} className="gallery-image" alt="" />
                                    <div className="gallery-item-info">
                                        <ul>
                                            <li className="gallery-item-likes"><span className="visually-hidden">Likes:</span><i className="fas fa-heart" aria-hidden="true"></i> {item.Likes?.length}</li>
                                            <li className="gallery-item-comments"><span className="visually-hidden">Comments:</span><i className="fas fa-comment" aria-hidden="true"></i> {item.Comments?.length}</li>
                                        </ul>
                                    </div>
                                </div>
                            </Link>
                        })}
                    </div>
                    {/* <div className="loader"></div> */}
                </div>

            </main >
        </div >
    }
}