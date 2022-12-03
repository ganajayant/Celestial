import axios from "axios";
import { Component } from "react";

import Navbar from "../../Components/Navbar/Navbar";

export default class IndividualPost extends Component {
    state = { post: '', user: '' }

    async componentDidMount() {
        const post = await axios.post(`http://localhost:5000/post/${window.location.pathname.split('/')[2]}`)
        this.setState({ post: post.data })
        if (this.state.post !== '') {
            const user = await axios.get(`http://localhost:5000/user/${this.state.post.Userid}`)
            this.setState({ user: user.data })
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
                                <a href="/#" className="card-link"><i className="fa-regular fa-heart"></i> Like</a>
                                <a href="/#" className="card-link"><i className="fa-regular fa-comment"></i> Comment</a>
                                <a href="/#" className="card-link"><i className="fa-solid fa-share"></i> Share</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}