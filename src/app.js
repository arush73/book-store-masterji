import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors"

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(cors({
    origin:process.env.CORS_ORIGIN
}))

// importing routes


// declaring routes

export { app };
