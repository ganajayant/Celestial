import axios from "axios";
import jwt from "jsonwebtoken";
import { Component } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import Login from "./Components/Login/Login";
import EditProfile from "./Components/ProfileSettings/EditProfile";
import Signup from "./Components/Signup/Signup";
import NotFound from "./Pages/404/404";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile/Profile";
import UploadPost from "./Pages/UploadPost";
import UserProfile from "./Pages/UserProfile/UserProfile";

function PrivateOutlet() {
    if (!localStorage.getItem('token')) {
        return <Navigate to="/login" />
    }
    const jwtPayload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]))
    if (Date.now() > jwtPayload.exp * 1000) {
        localStorage.removeItem('token')
        return <Navigate to="/login" />
    }
    return Date.now() < jwtPayload.exp * 1000 ? <Outlet /> : <Navigate to="/login" />;
}

export default class App extends Component {
    state = { userprops: '' }
    async componentDidMount() {
        const token = localStorage.getItem('token');
        if (token) {
            const user = jwt.decode(token)
            if (!user) {
                localStorage.removeItem('token');
                window.location.href = '/login'
            }
            else {
                const jwtPayload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]))
                if (Date.now() < jwtPayload.exp * 1000) {
                    const response = await axios.get('http://localhost:5000/user', {
                        headers: {
                            "x-access-token": localStorage.getItem('token')
                        }
                    })
                    const { data } = await response;
                    console.log('user', data);
                    this.setState({ userprops: data })
                }
            }
        }
    }
    render() {
        return <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/" element={<PrivateOutlet />} >
                <Route path="/" element={<Home user={this.state.userprops} />} />
            </Route>
            <Route exact path="/postupload" element={<PrivateOutlet />}>
                <Route path="/postupload" element={<UploadPost user={this.state.userprops} />} />
            </Route>
            <Route exact path="/editprofile" element={<PrivateOutlet />}>
                <Route path="/editprofile" element={<EditProfile user={this.state.userprops} />} />
            </Route>
            <Route exact path="/profile" element={<PrivateOutlet />}>
                <Route path="/profile" element={<Profile user={this.state.userprops} />} />
            </Route>
            <Route exact path="/userprofile/:id" element={<PrivateOutlet />}>
                <Route path="/userprofile/:id" element={<UserProfile user={this.state.userprops} />} />
            </Route>
            <Route exact path="*" element={<NotFound />} />
        </Routes>
    }
}