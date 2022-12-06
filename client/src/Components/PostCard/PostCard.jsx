import axios from "axios";
import { Component } from "react";

import './PostCard.css';

export default class PostCard extends Component {
    state = { username: '', profile: '', comment: '', liked: false, likes: this.props.likes, bookmarks: this.props.loggineduser?.bookmarks }

    async componentDidMount() {
        const response = await axios.get(`http://localhost:5000/user/${this.props.userid}`)
        const { data } = response;
        this.setState({ username: data.username, profile: data.ImageURL, comment: '' })
        if (this.props.loggineduser) {
            this.setState({ liked: this.props.likes.includes(this.props.loggineduser._id) })
        }
    }
    render() {
        return <div style={{ paddingBottom: "3em" }}>
            <div className="card">
                <div className="card-header p-3">
                    <div className="d-flex flex-row align-items-center">
                        <div
                            className="rounded-circle overflow-hidden d-flex justify-content-center align-items-center border sidenav-profile-photo">
                            <img src={this.state.profile} alt="..."
                                style={{ 'transform': 'scale(1.5)', 'width': '100%', 'position': 'absolute', 'left': '0' }} />
                        </div>
                        <span className="font-weight-bold" onClick={(e) => {
                            window.location.href = `http://localhost:3000/userprofile/${this.props.userid}`
                        }}>{this.state.username}</span>
                    </div>
                </div>
                <div className="card-body p-0">
                    <div className="embed-responsive embed-responsive-1by1">
                        <img className="embed-responsive-item" src={this.props.url} alt={''} style={{ height: '100%', width: '100%', objectFit: 'contain' }} />
                    </div>

                    <div className="d-flex flex-row justify-content-between pl-3 pr-3 pt-3 pb-1">
                        <ul className="list-inline d-flex flex-row align-items-center m-0">
                            <li className="list-inline-item">
                                <button className="btn p-0" onClick={(e) => {
                                    e.preventDefault();
                                    if (this.state.likes.includes(this.props.loggineduser._id)) {
                                        this.setState({ likes: this.state.likes.filter((id) => id !== this.props.loggineduser._id) })
                                    }
                                    else {
                                        this.setState({ likes: [...this.state.likes, this.props.loggineduser._id] })
                                    }
                                    this.setState({
                                        liked: !this.state.liked,
                                    })
                                    axios.put(`http://localhost:5000/post/like/${this.props.id}`, {
                                        "userid": this.props.loggineduser._id,
                                        "liked": this.props.likes.includes(this.props.loggineduser._id)
                                    })
                                }} >
                                    {this.state.liked ? <i className="fa fa-heart" style={{ color: 'red' }}></i> : <i className="fa fa-heart-o"></i>}
                                </button>
                            </li>
                            <li className="list-inline-item ml-2">
                                <button className="btn p-0" onClick={() => {
                                    window.location.href = `p/${this.props.id}`
                                }}>
                                    <i className="fa fa-comment-o"></i>
                                </button>
                            </li>
                            <li className="list-inline-item ml-2">
                                <button className="btn p-0" onClick={() => { navigator.clipboard.writeText(`http://localhost:3000/p/${this.props.id}`) }}>
                                    <i className="fa fa-share"></i>
                                </button>
                            </li>
                        </ul>
                        <div>
                            <button className="btn p-0" style={{ marginRight: "0.5em" }} onClick={(e) => {
                                e.preventDefault();
                                if (this.state.bookmarks.includes(this.props.id)) {
                                    this.setState({ bookmarks: this.state.bookmarks.filter((id) => id !== this.props.id) })
                                }
                                else {
                                    this.setState({ bookmarks: [...this.state.bookmarks, this.props.id] })
                                }
                                axios.put(`http://localhost:5000/user/bookmark/${this.props.id}`, {
                                    "userid": this.props.loggineduser._id,
                                })
                            }
                            } >
                                {
                                    this.state.bookmarks?.includes(this.props.id) ?
                                        <i className="fa fa-bookmark" style={{ color: 'black' }}></i> :
                                        <i className="fa fa-bookmark-o"></i>}
                            </button>
                        </div>
                    </div>

                    <div className="pl-3 pr-3 pb-2">
                        <strong className="d-block">{this.state.likes?.length} likes</strong>
                        <strong className="d-block">{this.state.username}</strong>
                        <p className="d-block mb-1">{this.props.caption}</p>
                        <button className="btn p-0">
                            <span className="text-muted">View all {this.props.comments?.length} comments</span>
                        </button>

                        <div>
                            {this.props.comments?.map((comment, index) => {
                                return index < 2 && <div key={index}>
                                    <strong className="d-block">{comment.user.username}</strong>
                                    <p className="d-block">{comment.comment}</p>
                                </div>
                            })}
                        </div>

                        <small className="text-muted">{this.props.time}</small>
                    </div>

                    <div className="position-relative comment-box">
                        <form>
                            <input className="w-100 border-0 p-3 input-post" placeholder="Add a comment..." value={
                                this.state.comment
                            } name="comment" onChange={
                                (e) => {
                                    this.setState({ comment: e.target.value })
                                }
                            } />
                            <button className="btn btn-primary position-absolute btn-ig" onClick={async (e) => {
                                e.preventDefault();
                                await axios.put(`http://localhost:5000/post/comment/${this.props.id}`, {
                                    "commenteduser": this.props.loggineduser,
                                    "comment": this.state.comment
                                }).then(() => {
                                    this.setState({ comment: '' })
                                    window.location.href = `p/${this.props.id}`;
                                })
                            }}>
                                <i className="fa fa-paper-plane-o"></i>
                            </button>
                        </form>
                    </div>

                </div>
            </div >
        </div >
    }
}