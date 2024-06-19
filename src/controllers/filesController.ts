import { Request, Response } from 'express';
import { ExternalFilesApiService } from '../services/externalFilesApiService';
import { FilesDataParserService } from '../services/filesDataParserService';


export class FilesController {
    private externalApiService: ExternalFilesApiService;
    private filesDataParserService: FilesDataParserService;

    constructor(externalApiService: ExternalFilesApiService, filesDataParserService: FilesDataParserService) {
        this.externalApiService = externalApiService;
        this.filesDataParserService = filesDataParserService;
    }

    public async getFiles(req: Request, res: Response) {
        const apiRes = await this.externalApiService.getFiles();
        if (apiRes) {
            const dir = await this.filesDataParserService.parseFilesApiResponse(apiRes);
            res.send(dir.formatToJson());
        } else {
            res.status(400);
            res.send('Failed to get data from API.');
        }
    }
}