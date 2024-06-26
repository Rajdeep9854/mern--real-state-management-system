import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import listingRouter from './routes/listing.route.js'
dotenv.config()


mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(`Error ${err}`);
})

const app = express();

app.use(express.json())
app.use(cookieParser())

app.listen(4000, () => {
    console.log(`server is running on port 4000`);
})

app.use('/api/v1/user', userRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/listing', listingRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})