import { cloudinaryconfig } from '../utils/cloudinary.js'

import POST from '../models/Post.js';

export const PostUpload = async (req, res, next) => {
    res.sendStatus(200);
    console.log(req.file);
    console.log(req.body);
    if (req.file) {
        const uploadresponse = await cloudinaryconfig.v2.uploader.upload(req.file.path, {
            upload_preset: 'Post2022'
        }).catch(error => {
            console.log(error.message)
        });
        console.log(uploadresponse);
        const post = new POST({
            ImageURL: uploadresponse.secure_url,
            Caption: req.body.caption,
            Userid: req.body.userid
        })
        post.save((error) => {
            if (error) {
                console.log(error);
                res.json({
                    error
                })
            }
            else {
                console.log('Success');
            }
        })
    }
    else {
        console.log('error');
    }
}

export const PostData = async (req, res, next) => {
    POST.find({}).then(
        items => res.json(items)
    )
}

export const PostId = async (req, res, next) => {
    POST.find({ Userid: req.params.id }).then(
        items => res.json(items)
    )
}