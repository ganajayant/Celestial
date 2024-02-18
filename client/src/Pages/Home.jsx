import { Component } from 'react';

import Navbar from '../Components/Navbar/Navbar';
import News from '../Components/News/News';
import Posts from '../Components/Posts/Post';
import UserCard from '../Components/UserCard/UserCard';

export default class Home extends Component {
    render() {
        return <div>
            <Navbar user={this.props.user} />
            <div className="mt-4">
                <div className="container d-flex justify-content-center">
                    <div className="col-9">
                        <div className="row">
                            <div className="col-8">
                                <div className="d-flex flex-column mt-4 mb-4">
                                    <Posts user={this.props.user} />
                                </div>
                            </div>
                            <div className="col-4">
                                <UserCard name={this.props.user.name} username={this.props.user.username} profileurl={this.props.user.ImageURL} />
                                <div className="mt-4">
                                    <News />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    }
}