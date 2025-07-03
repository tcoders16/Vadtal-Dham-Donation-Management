// File: src/server.ts
// This file sets up the Express server and connects to MongoDB
import express, {Request, Response} from 'express';
import cors from 'cors';
// Importing dotenv to manage environment variables
import dotenv from 'dotenv';
dotenv.config();

// Importing mongoose for MongoDB connection
import mongoose from 'mongoose';
// Importing the main application routes
import app from './app';


const server = express();
server.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
const PORT = process.env.PORT || 3001;
server.use(express.json());


// MongoDB connection using Mongoose    
mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error(' MongoDB connection error:', err));

server.get('/', (req: Request, res: Response)=>{
    res.send('GOOD HEALTH');
})

server.use('/app', app);




server.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`)
});

