import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';
import dataRoutes from './routes/data.routes.js';
import chatRoutes from './routes/chat.route.js';
import connectDB from './db/index.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true
    }
));
const port = process.env.PORT || 3000;

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/data', dataRoutes);
app.use('/api/v1/chat', chatRoutes);

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})