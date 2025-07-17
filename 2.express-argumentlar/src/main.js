import { config } from "dotenv";
import { connectDB } from "./db/index.js";
import express from 'express';


import userRoutes from './routes/user.route.js';
import videoRoutes from './routes/video.route.js';
import commentRoutes from './routes/comment.route.js';
import subscriptionRoutes from './routes/subscribtion.route.js';



 await connectDB()
config()

const PORT =+process.env.PORT;
const app = express();
app.use(express.json()); 




app.use('/users', userRoutes);
app.use('/videos', videoRoutes);
app.use('/comments', commentRoutes);
app.use('/subscriptions', subscriptionRoutes);



app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`)});