import { Request, Response } from 'express';
import { ExternalFilesApiService } from '../services/externalFilesApiService';


export class FilesController {
    private externalApiService: ExternalFilesApiService;

    constructor(externalApiService: ExternalFilesApiService) {
        this.externalApiService = externalApiService;
    }

    public async getFiles(req: Request, res: Response) {
        const apiRes = await this.externalApiService.getFiles();
        if (apiRes) {
            res.send(apiRes);
        } else {
            res.status(400);
            res.send('Failed to get data from API.');
        }
    }
}