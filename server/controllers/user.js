import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

import USER from "../models/User.js";
import { cloudinaryconfig } from '../utils/cloudinary.js';

export const Signup = (req, res, next) => {
    console.log(req.body);
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
                    console.log(error);
                    res.json({
                        error
                    })
                }
                else {
                    res.json({
                        user
                    })
                    // console.log('Success');
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
                    res.json({
                        error: error
                    })
                }
                if (result) {
                    let token = jwt.sign({ _id: user._id, name: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' })
                    res.cookie('t', token, { expire: new Date() + 9999 })
                    return res.json({ status: 'ok', user: token })
                }
                else {
                    console.log('Password Incorrect');
                    res.json({
                        message: 'Login Unsuccessful'
                    })
                }
            })
        }
        else {
            console.log('No User Found');
            res.json({
                message: 'No user found!'
            })
        }
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
            return res.status(200).json({ _id: userFound._id, name: userFound.name, username: userFound.username, email: userFound.email, createdAt: userFound.createdAt, ImageURL: userFound.ImageURL, bio: userFound.bio })
        })
    } catch (error) {
        res.json({ error: 'invalid token' })
    }
}

export const GetUserUsingID = (req, res, next) => {
    const id = req.params.id;
    try {
        let user = USER.findById(id).then(userFound => {
            return res.status(200).json({ _id: userFound._id, name: userFound.name, username: userFound.username, email: userFound.email, createdAt: userFound.createdAt, ImageURL: userFound.ImageURL, bio: userFound.bio })
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