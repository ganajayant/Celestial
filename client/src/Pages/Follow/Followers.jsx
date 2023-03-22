import axios from "axios";
import { Component } from "react";

import Navbar from "../../Components/Navbar/Navbar";

export default class Followers extends Component {
    state = { data: [] }
    async componentDidMount() {
        if (this.props.user) {
            const arr = this.props.user.followers
            const users = []
            for (let i = 0; i < arr.length; i++) {
                const response = axios.get(`http://localhost:5000/user/${arr[i]}`, {
                    headers: {
                        "auth-token": localStorage.getItem('token')
                    }
                });
                const { data } = await response;
                users.push(data);
            }
            this.setState({ data: users })
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
            <ul className="list-group">
                {this.state.data.map((item, index) => {
                    return (
                        <li className="list-group-item list-group-item-dark" key={index}>
                            <div
                                className="rounded-circle overflow-hidden d-flex justify-content-center align-items-center border sidenav-profile-photo" onClick={(e) => {
                                    e.preventDefault()
                                    window.location.href = `/user/${item._id}`
                                }}>
                                <img src={item.ImageURL} alt="..."
                                    style={{ 'transform': 'scale(1.5)', 'width': '100%', 'position': 'absolute', 'left': '0px' }} />

                            </div>
                            <div className="profile-info ml-3">
                                <span className="profile-info-username">{item.username}</span>
                            </div>
                            <button className="btn profile-edit-btn" onClick={async (e) => {
                                e.preventDefault();
                                axios.put(`http://localhost:5000/user/updatefollow/${this.props.user._id}`, {
                                    followedBy: item._id,
                                    follows: this.props.user?.followers?.includes(item._id)
                                }, {
                                    headers: {
                                        "auth-token": localStorage.getItem('token')
                                    }
                                })
                                this.setState({ data: this.state.data.filter((x) => x._id !== item._id) })
                            }}> Remove</button>
                        </li>
                    )
                })}
            </ul>
            {/* create a list */}

        </div>
    }
}