import { Component } from "react";

import axios from "../../AxiosConfig";
import Navbar from "../../Components/Navbar/Navbar";

export default class IndividualPost extends Component {
    state = { post: '', user: '', comments: [], liked: false, likes: [] }

    async componentDidMount() {
        const post = await axios.post(`post/${window.location.pathname.split('/')[2]}`, {}, {
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        })
        this.setState({ post: post.data })
        if (this.state.post !== '') {
            this.setState({
                likes: this.state.post.Likes,
                liked: this.state.post.Likes.includes(this.props.user._id)
            })
            const user = await axios.get(`user/${this.state.post.Userid}`, {
                headers: {
                    "auth-token": localStorage.getItem('token')
                }
            })
            this.setState({ user: user.data })
            let comments = []
            for (let i = 0; i < this.state.post.Comments.length; i++) {
                const comment = await axios.get(`user/${this.state.post.Comments[i].user._id}`, {
                    headers: {
                        "auth-token": localStorage.getItem('token')
                    }
                })
                comments.push({
                    user: comment.data,
                    comment: this.state.post.Comments[i].comment
                })
            }
            this.setState({ comments: comments })
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
            <div className="container">
                <div className="row">
                    <div className="col-6" style={{ marginLeft: "25%", marginTop: "2.5%" }}>
                        <div className="card">
                            <div className="card-header">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="user d-flex flex-row align-items-center">
                                        <img src={this.state.user.ImageURL} width="30" className="user-img rounded-circle mr-2" alt="User" />
                                        <span><small className="font-weight-bold text-primary">{this.state.user.username}</small></span>
                                    </div>
                                    <div className="action d-flex align-items-center">
                                        <div className="icon-holder">
                                            <i className="fa fa-ellipsis-v"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="image-holder">
                                    <img className="embed-responsive-item" src={this.state.post.ImageURL} alt={''} style={{ height: '100%', width: '100%', objectFit: 'contain' }} />
                                </div>
                                <p className="card-text">
                                    {this.props.caption}
                                </p>
                            </div>
                            <div className="card-footer">
                                <li className="list-inline-item">
                                    <button className="btn p-0" onClick={(e) => {
                                        e.preventDefault();
                                        if (this.state.likes.includes(this.props.user._id)) {
                                            this.setState({ likes: this.state.likes.filter((id) => id !== this.props.user._id) })
                                        }
                                        else {
                                            this.setState({ likes: [...this.state.likes, this.props.user._id] })
                                        }
                                        this.setState({
                                            liked: !this.state.liked,
                                        })
                                    }} >
                                        {this.state.liked ? <i className="fa fa-heart" style={{ color: 'red' }}></i> : <i className="fa fa-heart-o"></i>}
                                        {this.state.likes?.length}
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
                            </div>
                        </div>
                    </div>
                    {
                        this.state.comments.map((comment, index) => {
                            return <div className="col-6" style={{ marginLeft: "25%", marginTop: "2.5%" }}>
                                <div className="card">
                                    <div className="card-header">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="user d-flex flex-row align-items-center">
                                                <img src={comment.user.ImageURL} className="rounded-circle" height="22" alt=""
                                                    style={{ width: "22px" }} />
                                                <span><small className="font-weight-bold text-primary">{comment.user.username}</small></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <p className="card-text">
                                            {comment.comment}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    }
}