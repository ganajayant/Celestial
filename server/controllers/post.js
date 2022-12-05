import { cloudinaryconfig } from "../utils/cloudinary.js";

import POST from "../models/Post.js";
import USER from "../models/User.js";

export const PostUpload = async (req, res, next) => {
	res.sendStatus(200);
	console.log(req.file);
	console.log(req.body);
	if (req.file) {
		const uploadresponse = await cloudinaryconfig.v2.uploader
			.upload(req.file.path, {
				upload_preset: "Post2022",
			})
			.catch((error) => {
				console.log(error.message);
			});
		console.log(uploadresponse);
		const post = new POST({
			ImageURL: uploadresponse.secure_url,
			Caption: req.body.caption,
			Userid: req.body.userid,
		});
		post.save((error) => {
			if (error) {
				console.log(error);
				res.status(401).json({
					error,
				});
			} else {
				console.log("Success");
			}
		});
	} else {
		console.log("error");
	}
};

export const PostData = async (req, res, next) => {
	POST.find({}).then((items) => res.json(items));
};

export const PostId = async (req, res, next) => {
	POST.find({ Userid: req.params.id }).then((items) => res.json(items));
};

export const PostIdByPostId = async (req, res, next) => {
	POST.findById(req.params.id).then((items) => res.json(items));
};

export const PostsByList = async (req, res, next) => {
	POST.find({ Userid: { $in: req.body.list } }).then((items) => res.json(items));
}


export const PostLike = async (req, res, next) => {
	if (req.body.liked) {
		POST.findByIdAndUpdate(req.params.id, {
			$pull: { Likes: req.body.userid },
		}).then((items) => res.json(items));
	} else {
		POST.findByIdAndUpdate(req.params.id, {
			$push: { Likes: req.body.userid },
		}).then((items) => res.json(items));
	}
}

export const PostComment = async (req, res, next) => {
	POST.findByIdAndUpdate(req.params.id, {
		$push: { Comments: { comment: req.body.comment, user: req.body.commenteduser } },
	}).then((items) => {
		console.log(items);
		res.json(items)
	});
}


export const DeletePost = async (req, res, next) => {
	const users = await USER.find({});
	users.forEach(async (user) => {
		if (user.bookmarks.includes(req.params.id)) {
			await USER.findByIdAndUpdate(user._id, {
				$pull: { bookmarks: req.params.id },
			});
		}
	});
	POST.findByIdAndDelete(req.params.id).then((items) => res.json(items));
}