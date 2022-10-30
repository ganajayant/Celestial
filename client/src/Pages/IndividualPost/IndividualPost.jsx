// import axios from "axios";
import { Component } from "react";

import Navbar from "../../Components/Navbar/Navbar";

export default class IndividualPost extends Component {
    state = { username: '', profile: '' }

    async componentDidMount() {
        // const response = await axios.get(`http://localhost:5000/user/${this.props.userid}`)
        // const { data } = response;
        // this.setState({ username: data.username, profile: data.ImageURL })
    }
    render() {
        return <div>
            <Navbar user={this.props.user} />
        </div>
    }
}