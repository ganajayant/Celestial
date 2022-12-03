import axios from "axios";
import jwt from "jsonwebtoken";
import { Component } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import EditProfile from "./Components/ProfileSettings/EditProfile";
import NotFound from "./Pages/404/404";
import Explore from "./Pages/Explore/Explore";
import Followers from "./Pages/Follow/Followers";
import Following from "./Pages/Follow/Following";
import Home from "./Pages/Home";
import IndividualPost from "./Pages/IndividualPost/IndividualPost";
import Login from "./Pages/Login/Login";
import PasswordChange from "./Pages/PasswordChange/PasswordChange";
import Profile from "./Pages/Profile/Profile";
import Saved from "./Pages/Saved/Saved";
import Signup from "./Pages/Signup/Signup";
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
            <Route exact path="/p/:id" element={<PrivateOutlet />}>
                <Route path="/p/:id" element={<IndividualPost user={this.state.userprops} />} />
            </Route>
            <Route exact path="/explore" element={<PrivateOutlet />}>
                <Route path="/explore" element={<Explore user={this.state.userprops} />} />
            </Route>
            <Route exact path="/passwordchange" element={<PrivateOutlet />}>
                <Route path="/passwordchange" element={<PasswordChange user={this.state.userprops} />} />
            </Route>
            <Route exact path="/saved" element={<PrivateOutlet />}>
                <Route path="/saved" element={<Saved user={this.state.userprops} />} />
            </Route>
            <Route exact path="/followers" element={<PrivateOutlet />}>
                <Route path="/followers" element={<Followers user={this.state.userprops} />} />
            </Route>
            <Route exact path="/following" element={<PrivateOutlet />}>
                <Route path="/following" element={<Following user={this.state.userprops} />} />
            </Route>
            <Route exact path="*" element={<NotFound />} />
        </Routes>
    }
}