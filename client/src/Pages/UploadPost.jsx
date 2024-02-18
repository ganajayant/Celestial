import { Component } from "react";

import Navbar from "../Components/Navbar/Navbar";
import PostUpload from "../Components/PostUpload/PostUpload";

export default class UploadPost extends Component {
    render() {
        return <div>
            <Navbar user={this.props.user} />
            <PostUpload user={this.props.user} />
        </div>
    }
}