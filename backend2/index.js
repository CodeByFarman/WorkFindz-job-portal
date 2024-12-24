import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import adminRoute from "./routes/adminRoutes.js";
import validateSessionRoutes from "./routes/authRoutes.js";
import emailRoute from './routes/emailRoutes.js';
import resumeRoutes from "./routes/resumeRoutes.js";

dotenv.config({});

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
}

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;


// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
// Routes
app.use('/api', emailRoute); // Mount the email route at /api
app.use("/api/resumes", resumeRoutes);
// Routes
app.use('/api/admin', adminRoute);
app.use("/api", validateSessionRoutes);


app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`);
})