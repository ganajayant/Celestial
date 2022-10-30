import axios from "axios";
import { Component } from "react";

import Navbar from "../Navbar/Navbar";

export default class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '', image: '', name: '', username: '', bio: '', formErrors: { username: '' },
            usernameValid: false
        };
    }
    readURL = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            this.setState({ file: event.target.files[0] })
            this.setState({ image: URL.createObjectURL(event.target.files[0]) })
        }
    }
    componentDidUpdate(x, ps, ss) {
        if (ps.image === '') {
            this.setState({ image: this.props.user.ImageURL })
        }
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
        else {
            this.setState({ formErrors: { username: '' } });
        }
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData();
        data.append('file', this.state.file);
        data.append('bio', this.state.bio);
        data.append('userid', this.props.user._id);
        data.append('name', this.state.name)
        data.append('username', this.state.username)
        try {
            await axios.put('http://localhost:5000/user', data, {
                headers: { "Content-Type": "multipart/form-data" }
            }).then(response => {
                console.log(response);
                alert('Profile Updated Successfully');
                window.location.href = '/';
            }).catch(error => console.log(error))
        } catch (error) {
            console.log(error);
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
                                <h3> Edit Profile <i class="fa-solid fa-pen-to-square"></i></h3>
                                {this.state.formErrors.username && <span style={{ color: "red", fontSize: "13px" }} >{this.state.formErrors.username}</span>}
                                {
                                    this.state.image !== '' ? <img id="preview" src={this.state.image} alt="" style={{
                                        'height': '100%', 'width': '100%', 'objectFit': 'contain'
                                    }} /> : ''
                                }
                                <div className="form-floating mb-3">
                                    < input className="form-control" placeholder="Profile Picture" name="image" accept="image/*" value={this.state.value} required={true} onChange={this.readURL} type="file" />
                                </div>
                                <div className="form-floating mb-3">
                                    <input className="form-control" name="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} required={true} type="text" /><label>Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input className="form-control" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange} required={true} type="text" /><label>User Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input className="form-control" name="bio" placeholder="Bio" value={this.state.bio} onChange={this.handleChange} required={true} type="text" /><label>Bio</label>
                                </div>
                                <div className="mb-2">
                                    <button className="btn btn-dark fw-bold w-100 bg-gradient" type="submit" href="/#">Update Profile</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div >
            </section >
        </div>
    }
}