import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import OTP from "../models/OTP.js";
import POST from "../models/Post.js";
import USER from "../models/User.js";

import { cloudinaryconfig } from "../utils/cloudinary.js";
import { transporter } from "../utils/nodemailer.js";

// export const Signup = (req, res, next) => {
//     let obj = JSON.parse(Object.keys(req.body));
//     const email = obj.email;
//     const givenotp = obj.otp + "";
//     OTP.findOne({ email: email }).then(user => {
//         if (user) {
//             const otp = user.OTP;
//             const otpTime = user.OTPTime;
//             const currentTime = new Date().getTime();
//             const diff = currentTime - otpTime;
//             if (diff > 300000) {
//                 console.log('OTP Expired');
//                 res.status(404).json({
//                     message: 'OTP Expired'
//                 })
//             }
//             else {
//                 if (otp === givenotp) {
//                     bcrypt.hash(obj.password, 10, (err, hashedPass) => {
//                         if (err) {
//                             res.json({
//                                 error: err
//                             })
//                         }
//                         else {
//                             const user = new USER({
//                                 name: obj.fullname,
//                                 username: obj.username,
//                                 email: obj.email,
//                                 password: obj.password
//                             })
//                             user.name = obj.fullname;
//                             user.username = obj.username;
//                             user.email = obj.email;
//                             user.password = hashedPass;
//                             user.role = 'user';
//                             user.save((error, user) => {
//                                 if (error) {
//                                     console.log(error.message);
//                                     res.status(401).send({ message: error.message });
//                                 }
//                                 else {
//                                     res.json({
//                                         message: 'User Added Successfully!',
//                                         user
//                                     })
//                                 }
//                             })
//                         }
//                     })
//                 }
//             }
//         }
//         else {
//             console.log('no user found');
//             res.status(404).json({
//                 message: 'No user found!'
//             })
//         }
//     }).catch(err => {
//         res.status(404).send({ message: err.message });
//     })
// }
export const Signup = async (req, res, next) => {
	try {
		const obj = JSON.parse(JSON.stringify(req.body)); // Convert req.body to a JSON string and then parse it
		const email = obj.email;
		const givenotp = obj.otp + "";

		const user = await OTP.findOne({ email: email });

		if (!user) {
			console.log("No user found");
			return res.status(404).json({
				message: "No user found!",
			});
		}

		const otp = user.OTP;
		const otpTime = user.OTPTime;
		const currentTime = new Date().getTime();
		const diff = currentTime - otpTime;

		if (diff > 300000) {
			console.log("OTP Expired");
			return res.status(404).json({
				message: "OTP Expired",
			});
		}

		if (otp !== givenotp) {
			console.log("Invalid OTP");
			return res.status(401).json({
				message: "Invalid OTP",
			});
		}

		bcrypt.hash(obj.password, 10, async (err, hashedPass) => {
			if (err) {
				console.error(err);
				return res.status(500).json({
					error: "Failed to hash password",
				});
			}

			const newUser = new USER({
				name: obj.fullname,
				username: obj.username,
				email: obj.email,
				password: hashedPass,
				role: "user",
			});

			try {
				const savedUser = await newUser.save();
				res.json({
					message: "User added successfully",
					user: savedUser,
				});
			} catch (error) {
				console.error(error);
				res.status(500).json({
					error: "Failed to save user",
				});
			}
		});
	} catch (error) {
		console.error("Failed to parse JSON:", error);
		res.status(400).json({
			message: "Invalid JSON format",
		});
	}
};

export const Login = (req, res, next) => {
	let { email, password } = req.body;
	USER.findOne({ $or: [{ email }] })
		.then((user) => {
			if (user) {
				console.log(user.email);
				bcrypt.compare(password, user.password, (error, result) => {
					if (error) {
						return res.status(404).json({
							error: error.message,
						});
					}
					if (result) {
						let role = user.role;
						if (!role) {
							role = "user";
						}
						let token = jwt.sign(
							{ _id: user._id, name: user.username },
							process.env.JWT_SECRET,
							{ expiresIn: "1h" }
						);
						res.cookie("t", token, { expire: new Date() + 9999 });
						return res
							.status(200)
							.json({ user: token, role: role });
					} else {
						console.log("Password Incorrect");
						return res.status(404).json({
							message: "Login Unsuccessful",
						});
					}
				});
			} else {
				return res.status(404).json({
					message: "No user found!",
				});
			}
		})
		.catch((err) => {
			return res.status(404).send({ message: err.message });
		});
};

export const Logout = (req, res, next) => {
	res.clearCookie("t");
	res.json({ message: "Logout Success" });
};

export const GetUser = (req, res, next) => {
	const token = req.headers["x-access-token"];
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		let user = USER.findById(decoded._id).then((userFound) => {
			const role = userFound.role;
			if (!role) {
				role = "user";
			}
			return res.status(200).json({
				_id: userFound._id,
				name: userFound.name,
				username: userFound.username,
				role: role,
				email: userFound.email,
				createdAt: userFound.createdAt,
				ImageURL: userFound.ImageURL,
				bio: userFound.bio,
				followers: userFound.followers,
				following: userFound.following,
				bookmarks: userFound.bookmarks,
			});
		});
	} catch (error) {
		res.json({ error: "invalid token" });
	}
};

export const GetUserUsingID = (req, res, next) => {
	const id = req.params.id;
	try {
		let user = USER.findById(id).then((userFound) => {
			return res.status(200).json({
				_id: userFound._id,
				name: userFound.name,
				username: userFound.username,
				email: userFound.email,
				createdAt: userFound.createdAt,
				ImageURL: userFound.ImageURL,
				bio: userFound.bio,
				followers: userFound.followers,
				following: userFound.following,
			});
		});
	} catch (error) {
		res.json({ error: "Invalid User" });
	}
};

export const GetUserUsingSearch = async (req, res, next) => {
	const term = req.params.search;
	try {
		let regex = new RegExp(term, "i");
		let search = await USER.find({ username: regex }).exec();
		console.log(search);
		res.send({ payload: search });
	} catch (error) {
		res.json({ error: "Invalid User" });
	}
};

export const SendOTP = async (req, res, next) => {
	const email = req.body.email;
	const otp = Math.floor(100000 + Math.random() * 900000) + "";
	const message = {
		from: "admin@celestial.com",
		to: email,
		subject: "Your OTP",
		text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
	};
	transporter.sendMail(message, (error, info) => {
		if (error) {
			console.log(error);
		} else {
			console.log(`Email sent: ${info.response}`);
		}
	});
	const newOTP = new OTP({
		email: email,
		OTP: otp,
		OTPTIME: Date.now(),
	});
	OTP.find({ email: email }).then((otp) => {
		if (otp.length > 0) {
			OTP.deleteMany({ email: email }, (err) => {
				if (err) {
					res.status(500).json({ msg: "Error deleting OTP" });
				}
			});
		}
	});
	USER.find({ email: email }).then((user) => {
		if (user.length > 0) {
			res.status(500).json({ msg: "Email already exists." });
		} else {
			newOTP.save().then((otp) => {
				res.status(200).json({ msg: "OTP sent to your mail" });
			});
		}
	});
};
export const UpdateUser = async (req, res, next) => {
	res.sendStatus(200);
	console.log(req.file);
	console.log(req.body);
	if (!req.file) {
		USER.findByIdAndUpdate(
			req.body.userid,
			{
				bio: req.body.bio,
				name: req.body.name,
				username: req.body.username,
			},
			(error, documentuser) => {
				if (error) {
					console.log(error.message);
					res.json({ error });
				} else {
					console.log(documentuser);
				}
			}
		);
	}
	if (req.file) {
		const uploadresponse = await cloudinaryconfig.v2.uploader
			.upload(req.file.path, {
				upload_preset: "Post2022",
			})
			.catch((error) => {
				console.log(error.message);
			});
		console.log(uploadresponse);
		USER.findByIdAndUpdate(
			req.body.userid,
			{
				ImageURL: uploadresponse.secure_url,
				bio: req.body.bio,
				name: req.body.name,
				username: req.body.username,
			},
			(error, documentuser) => {
				if (error) {
					console.log(error.message);
					res.json({ error });
				} else {
					console.log(documentuser);
				}
			}
		);
	} else {
		console.log("error");
	}
};

export const UpdateFollow = (req, res, next) => {
	if (req.body.follows) {
		USER.findByIdAndUpdate(
			req.params.id,
			{
				$pull: { followers: req.body.followedBy },
			},
			(error) => {
				if (error) {
					console.log(error.message);
					res.json({ error });
				} else {
					console.log("Unfollowed");
				}
			}
		);
		USER.findByIdAndUpdate(
			req.body.followedBy,
			{
				$pull: { following: req.params.id },
			},
			(error) => {
				if (error) {
					console.log(error.message);
					res.json({ error });
				} else {
					console.log("Unfollowed");
				}
			}
		);
	} else {
		USER.findByIdAndUpdate(
			req.params.id,
			{
				$push: { followers: req.body.followedBy },
			},
			(error) => {
				if (error) {
					console.log(error.message);
					res.json({ error });
				} else {
					console.log("Followed");
				}
			}
		);
		USER.findByIdAndUpdate(
			req.body.followedBy,
			{
				$push: { following: req.params.id },
			},
			(error) => {
				if (error) {
					console.log(error.message);
					res.json({ error });
				} else {
					console.log("Followed");
				}
			}
		);
	}
};
export const UpdatePassword = (req, res, next) => {
	console.log("password", req.params.id);
	USER.findById(req.params.id)
		.then((user) => {
			if (user) {
				bcrypt.compare(
					req.body.oldpassword,
					user.password,
					(error, result) => {
						if (error) {
							res.status(404).json({
								error: error.message,
							});
						}
						if (result) {
							bcrypt.hash(
								req.body.newpassword,
								10,
								(err, hashedPass) => {
									if (err) {
										res.json({
											error: err,
										});
									} else {
										USER.findByIdAndUpdate(
											req.params.id,
											{
												password: hashedPass,
											},
											(error, documentuser) => {
												if (error) {
													console.log(error.message);
													res.json({ error });
												} else {
													console.log(documentuser);
													res.json({
														message:
															"Password Updated Successfully",
													});
												}
											}
										);
									}
								}
							);
						} else {
							console.log("Password Incorrect");
							res.status(404).json({
								message: "Login Unsuccessful",
							});
						}
					}
				);
			} else {
				res.json({
					message: "No user found!",
				});
			}
		})
		.catch((err) => {
			res.status(404).send({ message: err.message });
		});
};

export const UpdateBookmark = (req, res, next) => {
	USER.findById(req.body.userid).then((user) => {
		if (user) {
			if (user.bookmarks.includes(req.params.id)) {
				USER.findByIdAndUpdate(
					req.body.userid,
					{
						$pull: { bookmarks: req.params.id },
					},
					(error) => {
						if (error) {
							console.log(error.message);
							res.json({ error });
						} else {
							console.log("Removed Bookmark");
						}
					}
				);
			} else {
				USER.findByIdAndUpdate(
					req.body.userid,
					{
						$push: { bookmarks: req.params.id },
					},
					(error) => {
						if (error) {
							console.log(error.message);
							res.json({ error });
						} else {
							console.log("Added Bookmark");
						}
					}
				);
			}
		}
	});
};

export const GetUsers = async (req, res, next) => {
	try {
		let users = await USER.find().exec();
		res.send({ payload: users });
	} catch (error) {
		res.json({ error: "Invalid User" });
	}
};

export const DeleteUser = async (req, res, next) => {
	try {
		let user = await USER.findById(req.params.id).exec();
		user.followers.forEach((follower) => {
			USER.findByIdAndUpdate(
				follower,
				{
					$pull: { following: req.params.id },
				},
				(error) => {
					if (error) {
						console.log(error.message);
						res.json({ error });
					} else {
						console.log("Unfollowed");
					}
				}
			);
		});
		user.following.forEach((following) => {
			USER.findByIdAndUpdate(
				following,
				{
					$pull: { followers: req.params.id },
				},
				(error) => {
					if (error) {
						console.log(error.message);
						res.json({ error });
					} else {
						console.log("Unfollowed");
					}
				}
			);
		});
		let posts = await POST.find({ Userid: req.params.id }).exec();
		USER.find().then((users) => {
			users.forEach((user) => {
				user.bookmarks.forEach((bookmark) => {
					posts.forEach((post) => {
						if (bookmark == post._id) {
							USER.findByIdAndUpdate(
								user._id,
								{
									$pull: { bookmarks: post._id },
								},
								(error) => {
									if (error) {
										console.log(error.message);
										res.json({ error });
									} else {
										console.log("Removed Bookmark");
									}
								}
							);
						}
					});
				});
			});
		});
		posts.forEach((post) => {
			if (post.Likes.contains(req.params.id)) {
				POST.findByIdAndUpdate(
					post._id,
					{
						$pull: { Likes: req.params.id },
					},
					(error) => {
						if (error) {
							console.log(error.message);
							res.json({ error });
						} else {
							console.log("Removed Like");
						}
					}
				);
			}
		});

		POST.deleteMany({ Userid: req.params.id }, (error) => {
			if (error) {
				console.log(error.message);
				res.json({ error });
			} else {
				console.log("Posts Deleted");
			}
		});
		POST.find().then((posts) => {
			posts.forEach((post) => {
				post.Comments.forEach((comment) => {
					if (comment.user._id == req.params.id) {
						POST.findByIdAndUpdate(
							post._id,
							{
								$pull: { Comments: { user: req.params.id } },
							},
							(error) => {
								if (error) {
									console.log(error.message);
									res.json({ error });
								} else {
									console.log("Comment Deleted");
								}
							}
						);
					}
				});
			});
		});
		let users = await USER.findByIdAndDelete(req.params.id).exec();
		res.send({ payload: users });
	} catch (error) {
		res.json({ error: "Invalid User" });
	}
};
