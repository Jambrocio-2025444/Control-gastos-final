import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Ruta pública: login
router.post('/login', AuthController.login);

// Ruta protegida: obtener usuario actual
router.get('/me', authMiddleware, AuthController.me);

export default router;