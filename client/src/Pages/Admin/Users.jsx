import Swal from "sweetalert2";

import { Component } from "react";
import axios from "../../AxiosConfig";
export default class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        }
    }
    componentDidMount() {
        axios.get("user/users/all", {
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        }).then((res) => {
            let users = res.data.payload.filter((user) => {
                return user.role !== "admin"
            })
            this.setState({ users: users })
        })
    }
    render() {
        return <>
            {
                this.state.users.map((user) => {
                    return <div className="card" key={
                        user._id
                    }>
                        <div className="card-body">
                            <div className="d-flex justify-content-center">
                                <img src={
                                    user.ImageURL
                                } alt="" className="rounded-circle" width="100" height="100" />
                            </div>
                            <h5 className="card-title">{user.username}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{user.email}</h6>
                            <p className="card-text">Role: {user.role}</p>
                            <button className="btn btn-danger" onClick={(e) => {
                                e.preventDefault();
                                Swal.fire({
                                    title: "Are you sure you want to delete this user?",
                                    text: "You won't be able to revert this!",
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                    confirmButtonText: "Yes, delete it!"
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        axios.delete(`user/${user._id}`, {
                                            headers: {
                                                "auth-token": localStorage.getItem('token')
                                            }
                                        }).then((res) => {
                                            this.componentDidMount();
                                            Swal.fire(
                                                "Deleted!",
                                                "Your file has been deleted.",
                                                "success"
                                            )
                                        })
                                    }
                                })
                            }}>Delete</button>
                        </div>
                    </div>
                })
            }
        </>
    }
}