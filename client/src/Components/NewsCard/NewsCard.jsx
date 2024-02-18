import { Component } from "react";

export default class NewsCard extends Component {
    render() {
        return <div className="d-flex flex-row " style={{ paddingBottom: "1em" }}>
            <div className="card" style={{ "width": "18rem" }}>
                <div className="card-body">
                    <a href={this.props.link} rel="noopener noreferrer">
                        <h6 className="card-title">{this.props.title}</h6>
                    </a>
                </div>
            </div>
        </div>
    }
}