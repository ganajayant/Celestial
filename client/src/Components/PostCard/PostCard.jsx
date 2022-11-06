import axios from "axios";
import { Component } from "react";

import './PostCard.css';

export default class PostCard extends Component {
    state = { username: '', profile: '' }

    async componentDidMount() {
        const response = await axios.get(`http://localhost:5000/user/${this.props.userid}`)
        const { data } = response;
        this.setState({ username: data.username, profile: data.ImageURL, comment: '' })
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
                        <a href={`http://localhost:3000/userprofile/${this.props.userid}`}>
                            <span className="font-weight-bold">{this.state.username}</span>
                        </a>
                    </div>
                </div>
                <div className="card-body p-0">
                    <div className="embed-responsive embed-responsive-1by1">
                        <img loading="lazy" className="embed-responsive-item" src={this.props.url} alt={''} style={{ height: '100%', width: '100%', objectFit: 'contain' }} />
                    </div>

                    <div className="d-flex flex-row justify-content-between pl-3 pr-3 pt-3 pb-1">
                        <ul className="list-inline d-flex flex-row align-items-center m-0">
                            <li className="list-inline-item">
                                <button className="btn p-0" onClick={(e) => {
                                    e.preventDefault();
                                    axios.put(`http://localhost:5000/post/like/${this.props.id}`, {
                                        "userid": this.props.loggineduser._id,
                                        "liked": this.props.likes.includes(this.props.loggineduser._id)
                                    })
                                }} >
                                    {this.props.likes.includes(this.props.loggineduser._id) ? <i className="fa fa-heart" style={{ color: 'red' }}></i> : <i className="fa fa-heart-o"></i>}
                                </button>
                            </li>
                            <li className="list-inline-item ml-2">
                                <button className="btn p-0">
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
                            <button className="btn p-0" style={{ marginRight: "0.5em" }} >
                                <i className="fa fa-bookmark-o"></i>
                            </button>
                        </div>
                    </div>

                    <div className="pl-3 pr-3 pb-2">
                        <strong className="d-block">{this.props.likes?.length} likes</strong>
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
                            <input className="w-100 border-0 p-3 input-post" placeholder="Add a comment..." name="comment" onChange={
                                (e) => {
                                    this.setState({ comment: e.target.value })
                                }
                            } />
                            <button className="btn btn-primary position-absolute btn-ig" onClick={async (e) => {
                                e.preventDefault();
                                await axios.put(`http://localhost:5000/post/comment/${this.props.id}`, {
                                    "commenteduser": this.props.loggineduser,
                                    "comment": this.state.comment
                                })
                                this.setState({ comment: '' })
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