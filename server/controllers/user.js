import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

import USER from "../models/User.js";
import { cloudinaryconfig } from '../utils/cloudinary.js';

export const Signup = (req, res, next) => {
    let obj = JSON.parse(Object.keys(req.body));
    bcrypt.hash(obj.password, 10, (err, hashedPass) => {
        if (err) {
            res.json({
                error: err
            })
        }
        else {
            const user = new USER({
                name: obj.fullname,
                username: obj.username,
                email: obj.email,
                password: obj.password
            })
            user.name = obj.fullname;
            user.username = obj.username;
            user.email = obj.email;
            user.password = hashedPass;
            user.save((error, user) => {
                if (error) {
                    console.log(error.message);
                    res.status(401).send({ message: error.message });
                }
                else {
                    res.json({
                        message: 'User Added Successfully!',
                        user
                    })
                }
            })
        }
    })
}

export const Login = (req, res, next) => {
    let obj = JSON.parse(Object.keys(req.body));
    USER.findOne({ $or: [{ email: obj.email }] }).then(user => {
        if (user) {
            bcrypt.compare(obj.password, user.password, (error, result) => {
                if (error) {
                    res.status(404).json({
                        error: error.message
                    })
                }
                if (result) {
                    let token = jwt.sign({ _id: user._id, name: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' })
                    res.cookie('t', token, { expire: new Date() + 9999 })
                    return res.status(200).json({ user: token })
                }
                else {
                    console.log('Password Incorrect');
                    res.status(404).json({
                        message: 'Login Unsuccessful'
                    })
                }
            })
        }
        else {
            res.status(404).json({
                message: 'No user found!'
            })
        }
    }).catch(err => {
        res.status(404).send({ message: err.message });
    })
}

export const Logout = (req, res, next) => {
    res.clearCookie('t')
    res.json({ message: "Logout Success" })
}

export const GetUser = (req, res, next) => {
    const token = req.headers['x-access-token'];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        let user = USER.findById(decoded._id).then(userFound => {
            return res.status(200).json({ _id: userFound._id, name: userFound.name, username: userFound.username, email: userFound.email, createdAt: userFound.createdAt, ImageURL: userFound.ImageURL, bio: userFound.bio, followers: userFound.followers, following: userFound.following, bookmarks: userFound.bookmarks })
        })
    } catch (error) {
        res.json({ error: 'invalid token' })
    }
}

export const GetUserUsingID = (req, res, next) => {
    const id = req.params.id;
    try {
        let user = USER.findById(id).then(userFound => {
            return res.status(200).json({ _id: userFound._id, name: userFound.name, username: userFound.username, email: userFound.email, createdAt: userFound.createdAt, ImageURL: userFound.ImageURL, bio: userFound.bio, followers: userFound.followers, following: userFound.following })
        })
    } catch (error) {
        res.json({ error: 'Invalid User' })
    }
}


export const GetUserUsingSearch = async (req, res, next) => {
    const term = req.params.search;
    try {
        let regex = new RegExp(term, 'i');
        let search = await USER.find({ username: regex }).exec();
        console.log(search);
        res.send({ payload: search });
    } catch (error) {
        res.json({ error: 'Invalid User' })
    }
}


export const UpdateUser = async (req, res, next) => {
    res.sendStatus(200);
    console.log(req.file);
    console.log(req.body);
    if (!req.file) {
        USER.findByIdAndUpdate(req.body.userid, {
            bio: req.body.bio,
            name: req.body.name,
            username: req.body.username
        }, (error, documentuser) => {
            if (error) {
                console.log(error.message);
                res.json({ error })
            }
            else {
                console.log(documentuser);
            }
        })
    }
    if (req.file) {
        const uploadresponse = await cloudinaryconfig.v2.uploader.upload(req.file.path, {
            upload_preset: 'Post2022'
        }).catch(error => {
            console.log(error.message)
        });
        console.log(uploadresponse);
        USER.findByIdAndUpdate(req.body.userid, {
            ImageURL: uploadresponse.secure_url, bio: req.body.bio,
            name: req.body.name,
            username: req.body.username
        }, (error, documentuser) => {
            if (error) {
                console.log(error.message);
                res.json({ error })
            }
            else {
                console.log(documentuser);
            }
        })
    }
    else {
        console.log('error');
    }
}

export const UpdateFollow = (req, res, next) => {
    if (req.body.follows) {
        USER.findByIdAndUpdate(req.params.id, {
            $pull: { followers: req.body.followedBy }
        }, (error) => {
            if (error) {
                console.log(error.message);
                res.json({ error })
            }
            else {
                console.log('Unfollowed');
            }
        })
        USER.findByIdAndUpdate(req.body.followedBy, {
            $pull: { following: req.params.id }
        }, (error) => {
            if (error) {
                console.log(error.message);
                res.json({ error })
            }
            else {
                console.log('Unfollowed');
            }
        })
    }
    else {
        USER.findByIdAndUpdate(req.params.id, {
            $push: { followers: req.body.followedBy }
        }, (error) => {
            if (error) {
                console.log(error.message);
                res.json({ error })
            }
            else {
                console.log('Followed');
            }
        })
        USER.findByIdAndUpdate(req.body.followedBy, {
            $push: { following: req.params.id }
        }, (error) => {
            if (error) {
                console.log(error.message);
                res.json({ error })
            }
            else {
                console.log('Followed');
            }
        })

    }
}
export const UpdatePassword = (req, res, next) => {
    console.log('password', req.params.id);
    USER.findById(req.params.id).then(user => {
        if (user) {
            bcrypt.compare(req.body.oldpassword, user.password, (error, result) => {
                if (error) {
                    res.status(404).json({
                        error: error.message
                    })
                }
                if (result) {
                    bcrypt.hash(req.body.newpassword, 10, (err, hashedPass) => {
                        if (err) {
                            res.json({
                                error: err
                            })

                        }
                        else {
                            USER.findByIdAndUpdate(req.params.id, {
                                password: hashedPass
                            }, (error, documentuser) => {
                                if (error) {
                                    console.log(error.message);
                                    res.json({ error })
                                }
                                else {
                                    console.log(documentuser);
                                    res.json({ message: 'Password Updated Successfully' })
                                }
                            })
                        }
                    })
                }
                else {
                    console.log('Password Incorrect');
                    res.status(404).json({
                        message: 'Login Unsuccessful'
                    })
                }
            })
        }
        else {
            res.json({
                message: 'No user found!'
            })
        }
    }).catch(err => {
        res.status(404).send({ message: err.message });
    })
}

export const UpdateBookmark = (req, res, next) => {
    USER.findById(req.body.userid).then(user => {
        if (user) {
            if (user.bookmarks.includes(req.params.id)) {
                USER.findByIdAndUpdate(req.body.userid, {
                    $pull: { bookmarks: req.params.id }
                }, (error) => {
                    if (error) {
                        console.log(error.message);
                        res.json({ error })
                    }
                    else {
                        console.log('Removed Bookmark');
                    }
                })
            }
            else {
                USER.findByIdAndUpdate(req.body.userid, {
                    $push: { bookmarks: req.params.id }
                }, (error) => {
                    if (error) {
                        console.log(error.message);
                        res.json({ error })
                    }
                    else {
                        console.log('Added Bookmark');
                    }
                }
                )
            }
        }
    })
}