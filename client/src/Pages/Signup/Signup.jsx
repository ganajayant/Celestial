import axios from 'axios';
import { Component } from 'react';
import Swal from "sweetalert2";

import videoback from '../../Images/back.mp4';
import logo from "../../Images/logo.png"
import './Signup.css';

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '', fullname: '', username: '', password: '', formErrors: { username: '', password: '' },
            passwordValid: false, usernameValid: false
        };
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        if (event.target.name === 'username') {
            const usernameregex = /^[^\d][a-zA-Z_]{3,}$/;
            if (usernameregex.test(event.target.value)) {
                this.setState({ usernameValid: true });
                this.setState({ formErrors: { username: '' } });
            }
            else {
                this.setState({ usernameValid: false });
                this.setState({ formErrors: { username: 'Username must be atleast 4 characters long and must not start with a number' } });
            }
        }
        else if (event.target.name === "password") {
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
        else {
            this.setState({ formErrors: { username: '', password: '' } });
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        if (this.state.usernameValid && this.state.passwordValid) {
            try {
                const response = await axios.post('http://localhost:5000/signup', JSON.stringify({ email: this.state.email, fullname: this.state.fullname, username: this.state.username, password: this.state.password }));
                if (response.status === 200) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'You have successfully signed up!',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    });
                    window.location.href = '/login';
                }
            } catch (error) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Email already exists',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            }
        }
    }
    render() {
        return <div>
            <video autoPlay loop muted plays-inline="true" className="back-video">
                <source src={videoback} type="video/mp4" />
            </video>
            <section className="py-4">
                <div className="container">
                    <div className="row d-flex align-items-center justify-content-center">
                        <div style={{ maxWidth: '26.25em' }}>
                            <form action="#" className="bg-white border py-4 px-5" onSubmit={this.handleSubmit}>
                                <img src={logo} alt="" style={{ width: "12.5em", marginLeft: "3.125em" }} />
                                {this.state.formErrors.username && <span style={{ color: "red", fontSize: "13px" }} >{this.state.formErrors.username}</span>}
                                {this.state.formErrors.password && <span style={{ color: "red", fontSize: "13px" }} >{this.state.formErrors.password}</span>}
                                <div className="form-floating mb-3">
                                    <input className="form-control" name="email" placeholder="Email Address" value={this.state.value} onChange={this.handleChange} required={true} type="email" /><label>Email</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input className="form-control" name="fullname" placeholder="Full Name" value={this.state.value} onChange={this.handleChange} required={true} type="text" /><label>Full Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input className="form-control" name="username" placeholder="Username" value={this.state.value} onChange={this.handleChange} required={true} type="text" /><label>Username</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input className="form-control" name="password" placeholder="Password" value={this.state.value} onChange={this.handleChange} required={true} type="password" /><label>Password</label>
                                </div>
                                <div className="mb-2">
                                    <button className="btn btn-dark fw-bold w-100 bg-gradient" type="submit" href="/#">Sign Up</button>
                                </div>
                                <div className="small text-center">
                                    By signing up, you agree to our Terms , Data Policy and Cookies Policy.
                                </div>
                            </form>
                            <div className="bg-white py-4 px-5 text-center border mt-4">
                                <p className="m-0">
                                    Have an account? <a href="/login">Log In</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </div>
    }
}