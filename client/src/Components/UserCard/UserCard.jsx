import { Component } from "react";

export default class UserCard extends Component {

    render() {
        return <div className="d-flex flex-row align-items-center">
            <div
                className="rounded-circle overflow-hidden d-flex justify-content-center align-items-center border sidenav-profile-photo">
                <img src={this.props.profileurl} alt="..."
                    style={{ 'transform': 'scale(1.5)', 'width': '100%', 'position': 'absolute', 'left': '0px' }} />

            </div>
            <div className="profile-info ml-3">
                <span className="profile-info-username">{this.props.username}</span>
                <span className="profile-info-name">{this.props.name}</span>
            </div>
        </div>
    }
}