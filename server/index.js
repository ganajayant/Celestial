import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';

import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
dotenv.config()

import NewsRoutes from './routes/news.js';
import PostRoutes from './routes/post.js';
import UserRoutes from './routes/user.js';

import { logs } from './middlewares/morgan.js';
import upload from './middlewares/multer.js';

import { options } from './utils/swagger.js';

const URL = process.env.URL
const PORT = process.env.PORT || 5000;

const app = express();

mongoose.set("strictQuery", false);
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
})).catch((error) => console.log(error.message));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("combined", { stream: logs }));

app.use('/post', upload.single('file'), PostRoutes)
app.use('/news', NewsRoutes)
app.use('/user', upload.single('file'), UserRoutes)

app.get('/', (req, res) => {
    res.json({ message: 'Hello from celestial server' });
});

app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));