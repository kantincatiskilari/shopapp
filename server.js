import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import AuthRoute from './routes/auth.js';
import ProductRoute from './routes/product.js';
import UserRoute from './routes/user.js';

const app = express();
dotenv.config();

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Connected to DB"))
.catch((err) => console.log(err));

//middlewares
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth",AuthRoute);
app.use("/api/products",ProductRoute);
app.use("/api/users",UserRoute);


//error handler
app.use((err,req,res,next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong."
    return res.status(status).json({
        success: false,
        status,
        message
    });
});

app.listen(process.env.PORT,() => console.log(`Server running on port: ${process.env.PORT}`));