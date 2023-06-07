import express, { Application, Request, Response, NextFunction } from "express"
const app = express();
import cors from "cors"
import { connectDB } from "./db/connect";
const PORT = 5000;

app.use(cors({
    origin: "http://localhost:5173/",
    credentials: true
}));

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("Hi").status(200);
});

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
});