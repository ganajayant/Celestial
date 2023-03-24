import { Component } from "react";
import Swal from "sweetalert2";

import axios from "../../AxiosConfig";
import Navbar from "../../Components/Navbar/Navbar";

export default class PasswordChange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldpassword: '', newpassword: '', newconfirmpassword: '', formErrors: { password: '' },
            passwordValid: false
        };
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        if (event.target.name === "oldpassword") {
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
        else if (event.target.name === "newpassword") {
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
        else if (event.target.name === "newconfirmpassword") {
            if (event.target.value === this.state.newpassword) {
                this.setState({ passwordValid: true });
                this.setState({ formErrors: { password: '' } });
            }
            else {
                this.setState({ passwordValid: false });
                this.setState({ formErrors: { password: "Passwords do not match" } });
            }
        }
        else {
            this.setState({ passwordValid: false });
            this.setState({ formErrors: { password: '' } });
        }
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        if (this.state.passwordValid) {
            try {
                const response = await axios.put(`user/${this.props.user._id}`, JSON.stringify({ userid: this.props.user._id, oldpassword: this.state.oldpassword, newpassword: this.state.newpassword }), {
                    headers: {
                        'Content-Type': 'application/json',
                        "auth-token": localStorage.getItem('token')
                    }
                })
                if (response.status === 200) {
                    Swal.fire('Password Changed', 'Your password has been changed', 'success');
                    localStorage.removeItem('token');
                    await axios.get('user/auth/logout')
                    Swal.fire('Logout Success', 'See you again', 'success');
                    window.location.href = '/login';
                }
            }
            catch (err) {
                Swal.fire('Error', 'failded to change password check you crenditals', 'error');
            }
        }
    }
    render() {
        return <div>
            <Navbar user={this.props.user} />
            <section className="py-4">
                <div className="container">
                    <div className="row d-flex align-items-center justify-content-center">
                        <div style={{ 'maxWidth': '420px' }}>
                            <form action="#" className="bg-white border py-4 px-5" encType="multipart/form-data" onSubmit={this.handleSubmit}>
                                <h3> Edit Password <i className="fa-solid fa-pen-to-square"></i></h3>
                                {!this.state.passwordValid && <span style={{ color: "red", fontSize: "13px" }} >{this.state.formErrors.password}</span>}
                                <div className="form-floating mb-3">
                                    <input className="form-control" name="oldpassword" placeholder="Password" value={this.state.value} onChange={this.handleChange} required={true} type="password" /><label>Old Password</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input className="form-control" name="newpassword" placeholder="Password" value={this.state.value} onChange={this.handleChange} required={true} type="password" /><label>New Password</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input className="form-control" name="newconfirmpassword" placeholder="Password" value={this.state.value} onChange={this.handleChange} required={true} type="password" /><label>Confirm New Password</label>
                                </div>
                                <div className="mb-2">
                                    <button className="btn btn-dark fw-bold w-100 bg-gradient" type="submit" href="/#">Update Password</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div >
            </section >
        </div>
    }
}