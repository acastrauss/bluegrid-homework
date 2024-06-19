import { Router } from 'express';
import { getFiles } from '../controllers/filesController';

const router: Router = Router();

router.get('/files', getFiles);

export default router;