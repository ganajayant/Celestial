import axios from "axios";
import { Component } from "react";
import { Navigate } from "react-router-dom";

import videoback from '../../Images/back.mp4';
import logo from "../../Images/logo.png";
import './Login.css';

export default class Login extends Component {
    // form validation
    constructor(props) {
        super(props);
        this.state = {
            email: '', password: '', logginedin: false, formErrors: { password: '' },
            passwordValid: false,
        };
    }

    handleChange = (event) => {
        if (event.target.name === "password") {
            const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})");
            if (strongRegex.test(event.target.value)) {
                this.setState({ passwordValid: true });
                this.setState({ formErrors: { password: '' } });
            }
            else {
                this.setState({ passwordValid: false });
                this.setState({ formErrors: { password: "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character" } });
            }

        }

        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        if (this.state.passwordValid) {
            try {
                const response = await axios.post('http://localhost:5000/login', JSON.stringify({ email: this.state.email, password: this.state.password }))
                if (response.status === 200) {
                    localStorage.setItem('token', response.data.user);
                    alert('Login Successfull')
                    window.location.href = '/'
                }
            } catch (error) {
                alert('Check Your Credentials')
            }
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
                        <div style={{ maxWidth: '26.25em', marginTop: "10%" }}>
                            <form action="#" className="bg-white border py-4 px-5" onSubmit={this.handleSubmit}>
                                <img src={logo} alt="" style={{ width: "12.5em", marginLeft: "3.125em" }} />
                                {this.state.formErrors.password && <span style={{ color: "red", fontSize: "13px" }} >{this.state.formErrors.password}</span>}
                                <div className="form-floating mb-3">
                                    <input className="form-control" name="email" placeholder="Email Address" value={this.state.value} onChange={this.handleChange} required={true} type="email" /><label>Email</label>
                                </div>
                                <div className="form-floating mb-3">
                                    {/* {this.state
                                        .formErrors.password.length > 0 && (
                                            <span className="errorMessage">{this.state.formErrors.password}</span>
                                        )} */}
                                    <input className="form-control" name="password" placeholder="Password" value={this.state.value} onChange={this.handleChange} required={true} type="password" /><label>Password</label>
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