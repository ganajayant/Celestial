import { Component } from "react";
import { Navigate } from "react-router-dom";

import Posts from "./Posts";
import Users from "./Users";

export default class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            click: false
        }
    }
    componentDidMount() {
        if (this.props.user) {
            this.setState({ user: this.props.user })
        }
    }
    componentDidUpdate(prevprops) {
        if (prevprops.user !== this.props.user) {
            this.componentDidMount()
        }
    }

    render() {
        return this.state.user ? (this.props.user.role !== "admin" ? <Navigate to={"/"} /> : <>
            {/* sidebar */}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-auto bg-light sticky-top">
                        <div className="d-flex flex-sm-column flex-row flex-nowrap bg-light align-items-center sticky-top">
                            <a href="/" className="d-block p-3 link-dark text-decoration-none" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Icon-only">

                            </a>
                            <ul className="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center align-items-center">
                                <li className="nav-item" onClick={
                                    (e) => {
                                        e.preventDefault();
                                        this.setState({ click: false })
                                    }
                                }>
                                    <i className="fas fa-users fa-lg text-dark py-3 px-2"></i>
                                </li>
                                <li onClick={(e) => {
                                    e.preventDefault();
                                    this.setState({ click: true })
                                }}>
                                    <i className="fas fa-images fa-lg text-dark py-3 px-2"></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-sm p-3 min-vh-100">
                        {this.state.click ? <Posts /> : <Users />}
                    </div>
                </div>
            </div>
        </>) : <>
            {/* spinners */}
            <div className="spinner-border text-dark" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </>
    }
}