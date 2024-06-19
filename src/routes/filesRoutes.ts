import { Router } from 'express';
import { FilesController } from '../controllers/filesController';
import { ExternalFilesApiService } from '../services/externalFilesApiService';

const router: Router = Router();

const externalApiService = new ExternalFilesApiService();
const controller = new FilesController(externalApiService);

router.get('/files', controller.getFiles.bind(controller));

export default router;