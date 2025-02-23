import { Router } from 'express';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { uploadPatientData } from '../controllers/data.controller.js';
 
const router = Router();
router.use(verifyJWT);

router.post('/upload', uploadPatientData);

export default router;