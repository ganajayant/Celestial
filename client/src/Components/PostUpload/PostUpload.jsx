import axios from "axios";
import { Component } from "react";
import Swal from "sweetalert2";

export default class PostUpload extends Component {
	constructor(props) {
		super(props);
		this.state = { file: "", image: "", caption: "" };
	}

	readURL = (event) => {
		if (event.target.files && event.target.files.length > 0) {
			this.setState({ file: event.target.files[0] });
			this.setState({
				image: URL.createObjectURL(event.target.files[0]),
			});
		}
	};
	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	handleSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData();
		data.append("file", this.state.file);
		data.append("caption", this.state.caption);
		data.append("userid", this.props.user._id);
		try {
			await axios
				.post("http://localhost:5000/post", data, {
					headers: { "Content-Type": "multipart/form-data" },
				})
				.then((response) => {
					if (response.status === 200) {
						Swal.fire(
							"Post Uploaded",
							"Your post has been uploaded",
							"success"
						);
						window.location.href = "/";
					}
				})
				.catch((error) => {
					Swal.fire(
						"Post Upload Failed",
						"Please try again",
						"error"
					);
					console.log(error);
				});
		} catch (error) {
			console.log(error);
		}
	};
	render() {
		return (
			<section className="py-4">
				<div className="container">
					<div className="row d-flex align-items-center justify-content-center">
						<div style={{ maxWidth: "420px" }}>
							<form
								action="#"
								className="bg-white border py-4 px-5"
								encType="multipart/form-data"
								onSubmit={this.handleSubmit}
							>
								<h3>
									{" "}
									Post Upload{" "}
									<i className="fa-solid fa-upload"></i>
								</h3>
								{this.state.image !== "" ? (
									<img
										id="preview"
										src={this.state.image}
										alt=""
										style={{
											height: "100%",
											width: "100%",
											objectFit: "contain",
										}}
									/>
								) : (
									""
								)}
								<div className="form-floating mb-3">
									<input
										className="form-control"
										name="image"
										accept="image/*"
										value={this.state.value}
										required={true}
										onChange={this.readURL}
										type="file"
									/>
								</div>
								<div className="form-floating mb-3">
									<input
										className="form-control"
										name="caption"
										placeholder="Caption"
										value={this.state.value}
										onChange={this.handleChange}
										required={true}
										type="text"
									/>
									<label>Caption</label>
								</div>
								<div className="form-floating mb-3">
									<input
										className="form-control"
										name="location"
										placeholder="location"
										value={this.state.value}
										onChange={this.handleChange}
										required={true}
										type="text"
									/>
									<label>Location</label>
								</div>
								<div>
									<input
										// value={ this.state.value }
										// id={ this.state.value }
										// name={ this.state.value }
										// onChange={this.handleChange}
										// required={true}
										type="checkbox"
									/>
									<label>I agree to the user terms and conditions</label>
								</div>
								<div className="mb-2 pt-3">
									<button
										className="btn btn-dark fw-bold w-100 bg-gradient"
										type="submit"
										href="/#"
									>
										Post Image
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>
		);
	}
}
