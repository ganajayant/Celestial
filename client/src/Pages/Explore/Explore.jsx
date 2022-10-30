import { Component } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";


export default class Explore extends Component {
    constructor(props) {
        super(props);
        this.state = { posts: [] };
    }
    componentDidMount = async () => {
        try {
            const json = await axios.get('http://localhost:5000/post')
            this.setState({ posts: json.data })
        } catch (error) {

        }
    }
    render() {
        return <div>
            <Navbar user={this.props.user} />
            <div className="row" style={{ paddingTop: "2em", marginLeft: "20px", marginRight: "0px" }}>
                {this.state.posts.map(item => {
                    return <div className="col-lg-4 col-md-12 mb-4 mb-lg-0" key={item.ImageURL}  >
                        <img
                            src={item.ImageURL}
                            alt={""}
                            className="w-100 shadow-1-strong rounded mb-4"
                        />
                    </div >
                })}
            </div>
        </div >
    }
}