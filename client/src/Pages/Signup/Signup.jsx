import axios from 'axios';
import { Component } from 'react';

import videoback from '../../Images/back.mp4';
import logo from "../../Images/logo.png"
import './Signup.css';

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', fullname: '', username: '', password: '' };
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/signup', JSON.stringify({ email: this.state.email, fullname: this.state.fullname, username: this.state.username, password: this.state.password }));
            if (response.status === 200) {
                window.location.href = '/login';
            }
            else {
                alert('Something went wrong');
            }
        } catch (error) {
            console.log(error);
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
                        <div style={{ 'maxWidth': '26.25em' }}>
                            <form action="#" className="bg-white border py-4 px-5" onSubmit={this.handleSubmit}>
                                <img src={logo} alt="" style={{ width: "12.5em", marginLeft: "3.125em" }} />
                                <div className="form-floating mb-3">
                                    <input className="form-control" name="email" placeholder="Email Address" value={this.state.value} onChange={this.handleChange} required="" type="email" /><label>Email</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input className="form-control" name="fullname" placeholder="Full Name" value={this.state.value} onChange={this.handleChange} required="" type="text" /><label>Full Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input className="form-control" name="username" placeholder="Username" value={this.state.value} onChange={this.handleChange} required="" type="text" /><label>Username</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input className="form-control" name="password" placeholder="Password" value={this.state.value} onChange={this.handleChange} required="" type="password" /><label>Password</label>
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