import { Router } from 'express';
import { loginUser, logoutUser, registerUser, getUserGender } from '../controllers/user.controller.js';

const router = Router();

// Route for user signup
router.post('/signup', registerUser);

// Route for user signin
router.post('/signin', loginUser);

// Route for user logout
router.post('/logout', logoutUser);

// Route to get the current logged in user's gender
router.get('/gender', getUserGender);

router.get('/status', (req, res) => {
    console.log(req.headers.cookie);
    if (req.headers.cookie) {
        res.json({ status: true });
    } else {
        res.json({ status: true });
    }
})

export default router;