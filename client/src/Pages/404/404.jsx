import { Component } from "react";

import "./404.css";

export default class NotFound extends Component {
    render() {
        return <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="error-template">
                        <h1>
                            Oops!</h1>
                        <h2>
                            404 Not Found</h2>
                        <div className="error-details">
                            Sorry, an error has occured, Requested page not found!
                        </div>
                        <div className="error-actions">
                            <a href="/" className="btn btn-dark fw-bold w-100 bg-gradient"><span className="glyphicon glyphicon-home"></span>
                                Take Me Home </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}