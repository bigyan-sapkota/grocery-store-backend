import { getProfile, logoutUser, updateProfile } from '@/controllers/user.controller';
import { Router } from 'express';

const router = Router();

router.route('/profile').get(getProfile).put(updateProfile);
router.route('/logout').get(logoutUser).post(logoutUser);

export const userRoute = router;
