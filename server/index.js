import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import multer from "multer";

const storage = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            cb(null, 'uploads')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now())
        }
    }
)
const upload = multer({ storage: storage });

dotenv.config()

import LoginRoutes from './routes/login.js';
import NewsRoutes from './routes/news.js';
import PostRoutes from './routes/post.js';
import SignRoutes from './routes/signup.js';
import UserRoutes from './routes/user.js';

const URL = process.env.URL
const PORT = process.env.PORT || 5000;

const app = express();

mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})).catch((error) => console.log(error.message));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.use('/signup', SignRoutes)
app.use('/login', LoginRoutes)
app.use('/post', upload.single('file'), PostRoutes)
app.use('/news', NewsRoutes)
app.use('/user', upload.single('file'), UserRoutes)
