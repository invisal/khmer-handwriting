import express from 'express';
import homeController from './resources/home/home.controller';
import userController from './resources/user/user.controller';
import mediaController from './resources/media/media.controller';
import canvasController from './resources/home/canvas.controller';

const router = express.Router();

// HomeController
router.get('/', homeController.index);
router.get('/email', homeController.email);

router.get('/user/:id', userController.get);
router.post('/user', userController.post);
router.get('/canvas', canvasController.index);

router.post('/api/media', mediaController.uploadPhoto);

export default router;
