import { Router } from 'express';
import { IncomeController } from '../controllers/income.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.use(authMiddleware); // todas las rutas de ingresos requieren sesión

router.get('/', IncomeController.list);
router.post('/', IncomeController.create);
router.put('/:id', IncomeController.update);
router.delete('/:id', IncomeController.remove);

export default router;