import axios from "axios";
import { Component } from "react";

import './PostCard.css';

export default class PostCard extends Component {
    state = { username: '', profile: '' }

    async componentDidMount() {
        const response = await axios.get(`http://localhost:5000/user/${this.props.userid}`)
        const { data } = response;
        this.setState({ username: data.username, profile: data.ImageURL })
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
                                    <svg width="1.6em" height="1.6em" viewBox="0 0 16 16"
                                        className="bi bi-heart" fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                            d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                                    </svg>
                                </button>
                            </li>
                            <li className="list-inline-item ml-2">
                                <button className="btn p-0">
                                    <svg width="1.6em" height="1.6em" viewBox="0 0 16 16"
                                        className="bi bi-chat" fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                            d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
                                    </svg>
                                </button>
                            </li>
                            <li className="list-inline-item ml-2">
                                <button className="btn p-0" onClick={() => { navigator.clipboard.writeText(`http://localhost:3000/p/${this.props.id}`) }}>
                                    <svg width="1.6em" height="1.6em" viewBox="0 0 16 16"
                                        className="bi bi-share" fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                            d="M11.724 3.947l-7 3.5-.448-.894 7-3.5.448.894zm-.448 9l-7-3.5.448-.894 7 3.5-.448.894z" />
                                        <path fillRule="evenodd"
                                            d="M13.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm0 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm-11-6.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                                    </svg>
                                </button>
                            </li>
                        </ul>
                        <div>
                            <button className="btn p-0" >
                                <svg width="1.6em" height="1.6em" viewBox="0 0 16 16" className="bi bi-hdd"
                                    fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                        d="M14 9H2a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1zM2 8a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2H2z" />
                                    <path
                                        d="M5 10.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-2 0a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                                    <path fillRule="evenodd"
                                        d="M4.094 4a.5.5 0 0 0-.44.26l-2.47 4.532A1.5 1.5 0 0 0 1 9.51v.99H0v-.99c0-.418.105-.83.305-1.197l2.472-4.531A1.5 1.5 0 0 1 4.094 3h7.812a1.5 1.5 0 0 1 1.317.782l2.472 4.53c.2.368.305.78.305 1.198v.99h-1v-.99a1.5 1.5 0 0 0-.183-.718L12.345 4.26a.5.5 0 0 0-.439-.26H4.094z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="pl-3 pr-3 pb-2">
                        <strong className="d-block">{this.props.likes?.length} likes</strong>
                        <strong className="d-block">{this.state.username}</strong>
                        <p className="d-block mb-1">{this.props.caption}</p>
                        <button className="btn p-0">
                            <span className="text-muted">View all 2,247 comments</span>
                        </button>

                        <div>
                            <div>
                                <strong className="d-block">a.7.m3ff</strong>
                                <span>❤️💓💓💓💓💓</span>
                            </div>
                            <div>
                                <strong className="d-block">adri_rez77</strong>
                                <span>Hi</span>
                            </div>
                        </div>

                        <small className="text-muted">{this.props.time}</small>
                    </div>

                    <div className="position-relative comment-box">
                        <form>
                            <input className="w-100 border-0 p-3 input-post" placeholder="Add a comment..." />
                            <button className="btn btn-primary position-absolute btn-ig">Post</button>
                        </form>
                    </div>

                </div>
            </div >
        </div >
    }
}