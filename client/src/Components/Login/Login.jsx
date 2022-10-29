import axios from "axios";
import { Component } from "react";
import { Navigate } from "react-router-dom";

import videoback from '../Images/back.mp4';
import logo from "../Images/logo.png"
import './Login.css';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', logginedin: false };
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', JSON.stringify({ email: this.state.email, password: this.state.password }))
            const data = await response;
            if (data.data.user) {
                localStorage.setItem('token', data.data.user);
                alert('Login Successfull')
                window.location.href = '/'
            }
            else {
                alert('Login Failed')
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        if (this.state.logginedin) {
            return <Navigate to="/" />
        }
        return <div>
            <video autoPlay loop muted plays-inline="true" className="back-video">
                <source src={videoback} type="video/mp4" />
            </video>
            <section className="py-4">
                <div className="container">
                    <div className="row d-flex align-items-center justify-content-center">
                        <div style={{ 'maxWidth': '420px' }}>
                            <form action="#" className="bg-white border py-4 px-5" onSubmit={this.handleSubmit}>
                                <img src={logo} alt="" />
                                <div className="form-floating mb-3">
                                    <input className="form-control" name="email" placeholder="Email Address" value={this.state.value} onChange={this.handleChange} required="" type="email" /><label>Email</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input className="form-control" name="password" placeholder="Password" value={this.state.value} onChange={this.handleChange} required="" type="password" /><label>Password</label>
                                </div>
                                <div className="mb-2">
                                    <button className="btn btn-dark fw-bold w-100 bg-gradient" type="submit" href="/#">Log In</button>
                                </div>
                            </form>
                            <div className="bg-white py-4 px-5 text-center border mt-4">
                                <p className="m-0">
                                    Doesn't Have account? <a href="/signup  ">Sign Up</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
            {/* <form onSubmit={this.handleSubmit}>
                <h3>Login</h3>
                <label for="email">Email</label>
                <input placeholder="Email" id="email" name="email" value={this.state.value} onChange={this.handleChange} required="" type="email" />
                <label for="password">Password</label>
                <input id="password" name="password" placeholder="Password" value={this.state.value} onChange={this.handleChange} required="" type="password" />
                <button>Log In</button>
                <p className="m-0" style={{ paddingTop: "2em" }}>
                    Doesn't Have account? <a href="/signup  ">Sign Up</a>
                </p>
            </form > */}
        </div>
    }
}