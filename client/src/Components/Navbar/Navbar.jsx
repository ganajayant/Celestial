import axios from '../../AxiosConfig';
import { Component } from 'react';
import Swal from "sweetalert2";

import logo from "../../Images/logo.png";

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = { search: 'a', searchData: [] }
    }
    Click = async () => {
        localStorage.removeItem('token');
        await axios.get('user/auth/logout')
        Swal.fire('Logout Success', 'See you again', 'success');
        window.location.href = '/login';
    }
    handleChange = async (event) => {
        this.setState({ [event.target.name]: event.target.value });
        if (this.state.search !== '') {
            await axios.get(`user/usersearch/${this.state.search}`, {
                headers: {
                    "auth-token": localStorage.getItem('token')
                }
            })
                .then(res => {
                    const indexOfObject = res.data.payload.findIndex(object => {
                        return object._id === this.props.user._id;
                    });
                    res.data.payload.splice(indexOfObject, 1)
                    this.setState({ searchData: res.data.payload })
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }
    render() {
        return <div >
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" data-mdb-target="#navbarCenteredExample"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fa-solid fa-bars"></i>
                    </button>

                    <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-1"></div>
                                <div className="col-md-5" style={{ height: "2.5em" }}>
                                    <a className="navbar-brand" href="/">
                                        <img src={logo}
                                            height="30px" alt="" />
                                    </a>
                                </div>
                                <div className="col-md-2">
                                    <form className="d-flex input-group w-auto" >
                                        <input type="text" className="form-control" list="search" name='search' placeholder="Search" aria-label="Search" onChange={this.handleChange} />
                                        <ul className='list-group'>
                                            {this.state.searchData.map((data) =>
                                                <button type='button' className='list-group-item list-group-item-action' onClick={(e) => { window.location.href = `/userprofile/${data._id}` }} key={data._id}>
                                                    {data.username}
                                                </button>
                                            )}
                                        </ul>
                                    </form>
                                </div>
                                <div className="col-md-3">
                                    <ul className="navbar-nav justify-content-center">
                                        <li className="nav-item me-3 me-lg-0">
                                            <a className="nav-link" href="/">
                                                <i className="fas fa-home fa-lg text-dark"></i>
                                            </a>
                                        </li>
                                        <li className="nav-item me-3 me-lg-0">
                                            <a className="nav-link" href="/#">
                                                <i className="fas fa-paper-plane fa-lg text-dark"></i>
                                            </a>
                                        </li>
                                        <li className="nav-item me-3 me-lg-0">
                                            <a className="nav-link" href="/explore">
                                                <i className="far fa-compass fa-lg text-dark"></i>
                                            </a>
                                        </li>
                                        <li className="nav-item me-3 me-lg-0">
                                            <a className="nav-link" href="/#">
                                                <i className="far fa-heart fa-lg text-dark"></i>
                                            </a>
                                        </li>
                                        <li className="nav-item me-3 me-lg-0">
                                            <a className="nav-link" href="/postupload" style={{ paddingBottom: "0.375em", paddingTop: "0.375em" }}>
                                                <svg aria-label="New post" className="_ab6-" color="#262626" fill="#262626" height="22" role="img" viewBox="0 0 24 24" width="22"><path d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="6.545" x2="17.455" y1="12.001" y2="12.001"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12.003" x2="12.003" y1="6.545" y2="17.455"></line></svg>
                                            </a>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle d-flex align-items-center" href="/#" id="navbarDropdownMenuLink"
                                                role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <img src={this.props.user.ImageURL} className="rounded-circle" height="22" alt=""
                                                    style={{ width: "22px" }} />
                                            </a>
                                            <ul className="dropdown-menu" style={{ margin: 0 }} aria-labelledby="navbarDropdownMenuLink">
                                                <li><a className="dropdown-item" href="/profile">My profile</a></li>
                                                <li><a className="dropdown-item" href="/saved">Saved Posts</a></li>
                                                <li><a className="dropdown-item" href="/editprofile">Settings</a></li>
                                                <li><a className="dropdown-item" href="/passwordchange">Password Change</a></li>
                                                <li>
                                                    <button className='dropdown-item' onClick={this.Click}>
                                                        Logout
                                                    </button>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav >
        </div >
    }
}
