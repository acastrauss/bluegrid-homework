import { Router } from 'express';
import { FilesController } from '../controllers/filesController';
import { ExternalFilesApiService } from '../services/externalFilesApiService';
import { FilesDataParserService } from '../services/filesDataParserService';

const router: Router = Router();

const externalApiService = new ExternalFilesApiService();
const filesDataParserService = new FilesDataParserService();
const controller = new FilesController(externalApiService, filesDataParserService);

router.get('/files', controller.getFiles.bind(controller));

export default router;