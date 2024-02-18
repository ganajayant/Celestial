import Swal from "sweetalert2";

import axios from "../../AxiosConfig";
import { Component } from "react";

export default class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        }
    }
    componentDidMount() {
        axios.get("post/", {
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        }).then((res) => {
            this.setState({ posts: res.data })
        })
    }
    render() {
        return <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Posts</h3>
                            </div>
                            <div className="card-body">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th style={{ width: 10 }}>#</th>
                                            <th>Post</th>
                                            <th>Caption</th>
                                            <th>Likes</th>
                                            <th>Created At</th>
                                            <th style={{ width: 40 }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.posts.map((post, index) => {
                                            return <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    {/* image */}
                                                    <div className="d-flex align-items-center">
                                                        <div className="flex-shrink-0">
                                                            <img src={post.ImageURL
                                                            } alt="..." className="img-fluid rounded" style={{ width: 50, height: 50 }} />
                                                            <a href={`http://localhost:3000/p/${post._id}`} className="text-decoration-none text-dark">Link</a>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{post.Caption}</td>
                                                <td>{post.Likes?.length}</td>
                                                <td>{
                                                    new Date(post.createdAt).toLocaleDateString()}</td>
                                                <td>
                                                    <button className="btn btn-danger btn-sm" onClick={
                                                        (e) => {
                                                            e.preventDefault();
                                                            Swal.fire({
                                                                title: 'Are you sure?',
                                                                text: "You won't be able to revert this!",
                                                                icon: 'warning',
                                                                showCancelButton: true,
                                                                confirmButtonColor: '#3085d6',
                                                                cancelButtonColor: '#d33',
                                                                confirmButtonText: 'Yes, delete it!'
                                                            }).then((result) => {
                                                                if (result.isConfirmed) {
                                                                    axios.delete(`post/${post._id}`, {
                                                                        headers: {
                                                                            "auth-token": localStorage.getItem('token')
                                                                        }
                                                                    }).then((res) => {
                                                                        this.componentDidMount()
                                                                        Swal.fire(
                                                                            'Deleted!',
                                                                            'success'
                                                                        )
                                                                    })
                                                                }
                                                            })
                                                        }
                                                    } >Delete</button>
                                                </td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    }
}