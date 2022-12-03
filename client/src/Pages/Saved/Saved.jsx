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
                const response = axios.post(`http://localhost:5000/post/${arr[i]}`);
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
                <div className='row'>
                    {
                        this.state.data.map((item, index) => {
                            return (
                                <div className='col-2' key={index}>
                                    <div className="card" style={{ width: "18rem" }}>
                                        <img src={item.ImageURL} className="card-img-top" alt="..." />
                                        <div className="card-body">
                                            <h5 className="card-title">{item.title}</h5>
                                            <p className="card-text">{item.description}</p>
                                            <a href={`/post/${item._id}`} className="btn btn-primary">Go somewhere</a>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    }
}