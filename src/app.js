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

// importing routers
import authRouter from "./routes/auth.routes.js"
import bookRouter from "./routes/books.routes.js"

// declaring routes
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/books", bookRouter)

export { app };
