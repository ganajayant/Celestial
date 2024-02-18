// Import dependencies
import chai from "chai";
import chaiHttp from "chai-http";
import { Login } from "../controllers/user.js"; // Replace with the correct path to your authController file

// Configure Chai
chai.use(chaiHttp);
const expect = chai.expect;

// // Describe block for Signup function
// describe("Signup", () => {
// 	it("should create a new user with valid input", (done) => {
// 		// Create a mock request object
// 		const req = {
// 			body: {
// 				email: "",
// 				password: "",
// 			},
// 		};

// 		// Create a mock response object
// 		const res = {
// 			json: (response) => {
// 				expect(response)
// 					.to.have.property("message")
// 					.that.equals("User Added Successfully!");
// 				expect(response).to.have.property("user").that.is.an("object");
// 				done(); // Call done() to signal the completion of the test
// 			},
// 			status: () => {
// 				return {
// 					send: (error) => {
// 						done(error);
// 					},
// 				};
// 			},
// 		};

// 		// Call the Signup function with the mock request and response objects
// 		Signup(req, res);
// 	}).timeout(50000); // Increase timeout to 5000ms to address the timeout error
// });

// Describe block for Login function
describe("Login", () => {
	it("should return a successful login response with user object", (done) => {
		// Create a mock request object
		const req = {
			body: {
				email: "",
				password: "",
			},
		};

		// Create a mock response object
		const res = {
			json: (response) => {
				expect(response)
					.to.have.property("message")
					.that.equals("Login Successful");
				expect(response).to.have.property("user").that.is.an("object");
				done(); // Call done() to signal the completion of the test
			},
			status: () => {
				return {
					send: (error) => {
						done(error);
					},
				};
			},
		};

		// Call the Login function with the mock request and response objects
		Login(req, res);
	}).timeout(5000); // Increase timeout to 5000ms to address the timeout error

	it("should return an error response for invalid credentials", (done) => {
		// Create a mock request object with invalid credentials
		const req = {
			body: {
				email: "",
				password: "",
			},
		};

		// Create a mock response object
		const res = {
			json: (response) => {
				expect(response)
					.to.have.property("message")
					.that.equals("Invalid email or password");
				done(); // Call done() to signal the completion of the test
			},
			status: () => {
				return {
					send: (error) => {
						done(error);
					},
				};
			},
		};

		// Call the Login function with the mock request and response objects
		Login(req, res);
	}).timeout(5000); // Increase timeout to 5000ms to address the timeout error
});
