import axios from "axios";
import { Component } from "react";

import Navbar from "../../Components/Navbar/Navbar";
import "./Profile.css";

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = { posts: [] };
    }
    componentDidUpdate(prevprops) {
        if (prevprops.user !== this.props.user) {
            this.componentDidMount()
        }
    }
    getData = () => {
        axios.get(`http://localhost:5000/post/${this.props.user._id}`)
            .then(e => {
                this.setState({ posts: e.data })
            })
    }
    componentDidMount() {
        this.getData();
    }
    render() {
        return <div>
            <Navbar user={this.props.user} />
            <header>
                <div className="container" >
                    <div className="profile">
                        <div className="profile-image">
                            <img src={this.props.user.ImageURL} className="rounded-circle" height="100" style={{ height: "200px", width: "200px" }} alt="" />
                        </div>
                        <div className="profile-user-settings">
                            <h1 className="profile-user-name">{this.props.user.username}</h1>
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
                                <li onClick={(e) => {
                                    window.location.href = `/followers`
                                }}><span className="profile-stat-count">{this.props.user?.followers?.length}</span> followers</li>
                                <li onClick={(e) => {
                                    window.location.href = `/following`
                                }}><span className="profile-stat-count">{this.props.user?.following?.length}</span> following</li>
                            </ul>
                        </div>
                        <div className="profile-bio">
                            <p><span className="profile-real-name">{this.props.user.name}</span> {this.props.user.bio}</p>
                        </div>
                    </div>
                </div>
            </header>
            <main>
                <div className="container">
                    <div className="gallery row row-cols-1 row-cols-sm-3 row-cols-md-3" >
                        {this.state.posts.reverse().map(item => {
                            return <div className="gallery-item" tabIndex="0" key={item._id} onClick={(e) => {
                                e.preventDefault()
                                window.location.href = `/p/${item._id}`
                            }}>
                                <img src={item.ImageURL} className="gallery-image" alt="" />
                                <div className="gallery-item-info">
                                    <ul>
                                        <li className="gallery-item-likes"><span className="visually-hidden">Likes:</span><i className="fas fa-heart" aria-hidden="true"></i> {item.Likes?.length}</li>
                                        <li className="gallery-item-comments"><span className="visually-hidden">Comments:</span><i className="fas fa-comment" aria-hidden="true"></i> {item.Comments?.length}</li>
                                    </ul>
                                </div>
                            </div>
                        })}
                    </div>
                    {/* <div className="loader"></div> */}
                </div>
            </main >
        </div >
    }
}