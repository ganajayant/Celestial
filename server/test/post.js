import { expect } from "chai";
import { PostUpload } from "../controllers/post.js";

describe("PostUpload", () => {
  it("should return 200 status code", async () => {
    // Create mock request and response objects
    const req = {
      file: {
        path: "/path/to/image.jpg" // Mock file path
      },
      body: {
        caption: "Test caption",
        userid: "123456" // Mock user ID
      }
    };
    const res = {
      sendStatus: (statusCode) => {
        expect(statusCode).to.equal(200);
      },
      status: () => {
        return {
          json: (data) => {
            // Assert the response data
            expect(data).to.have.property("ImageURL");
            expect(data).to.have.property("Caption");
            expect(data).to.have.property("Userid");
            expect(data.ImageURL).to.be.a("string");
            expect(data.Caption).to.be.a("string");
            expect(data.Userid).to.be.a("string");
          }
        };
      }
    };
    await PostUpload(req, res, () => {});
  });

  it("should return 401 status code if there's an error", async () => {
    // Create mock request and response objects
    const req = {
      file: {
        path: "/path/to/image.jpg" // Mock file path
      },
      body: {
        caption: "Test caption",
        userid: "123456" // Mock user ID
      }
    };
    const res = {
      status: (statusCode) => {
        expect(statusCode).to.equal(401);
        return {
          json: (data) => {
            // Assert the response data
            expect(data).to.have.property("error");
            expect(data.error).to.be.a("string");
          }
        };
      }
    };
    // Mock error during file upload
    const cloudinaryconfig = {
      v2: {
        uploader: {
          upload: () => {
            throw new Error("Upload failed");
          }
        }
      }
    };
    await PostUpload(req, res, () => {});
  });
});
