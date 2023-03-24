import { Component } from "react";

import axios from "../../AxiosConfig";
import Navbar from "../../Components/Navbar/Navbar";

export default class Following extends Component {
    state = { data: [] }
    async componentDidMount() {
        if (this.props.user) {
            const arr = this.props.user.following
            const users = []
            for (let i = 0; i < arr.length; i++) {
                const response = axios.get(`user/${arr[i]}`, {
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
                                axios.put(`http://localhost:5000/user/updatefollow/${item._id}`, {
                                    followedBy: this.props.user._id,
                                    follows: item?.followers?.includes(this.props.user._id)
                                }, {
                                    headers: {
                                        "auth-token": localStorage.getItem('token')
                                    }
                                })
                                this.setState({ data: this.state.data.filter((x) => x._id !== item._id) })
                            }}> {item.followers?.includes(this.props.user._id) && <>following</>}{!item.followers?.includes(this.props.user._id) && <>follow</>}</button>
                        </li>
                    )
                })}
            </ul>
            {/* create a list */}

        </div>
    }
}