import axios from "axios";
import { Component } from "react";

import Navbar from "../../Components/Navbar/Navbar";

export default class IndividualPost extends Component {
    state = { data: [] }
    async componentDidMount() {
        if (this.props.user) {
            const arr = this.props.user.bookmarks
            const posts = []
            for (let i = 0; i < arr.length; i++) {
                const response = axios.post(`http://localhost:5000/post/${arr[i]}`, {}, {
                    headers: {
                        "auth-token": localStorage.getItem('token')
                    }
                });
                const { data } = await response;
                posts.push(data);
            }
            this.setState({ data: posts })
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
            <div className='container-fluid' >
                <div className="row" style={{ paddingTop: "2em", marginLeft: "20px", marginRight: "0px" }}>
                    {this.state.data.map(item => {
                        return <div className="col-lg-4 col-md-12 mb-4 mb-lg-0" key={item.ImageURL} onClick={(e) => {
                            e.preventDefault()
                            window.location.href = `/p/${item._id}`
                        }}  >
                            <img
                                src={item.ImageURL}
                                alt={""}
                                className="w-100 shadow-1-strong rounded mb-4"
                            />
                        </div >
                    })}
                </div>
            </div>
        </div>
    }
}