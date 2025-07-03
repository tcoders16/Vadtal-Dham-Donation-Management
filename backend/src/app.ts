import cors from "cors";
import { Router } from "express";
//admin route imports here
import adminRoutes from './routes/adminRoutes';
const app = Router();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));




// Import routes
app.use('/admin', adminRoutes);





export default app;
