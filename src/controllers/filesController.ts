import axios from 'axios';
import config from 'config';
import { Request, Response } from 'express';
import { FilesApiResponse } from '../models/filesApiResponse';

const FILES_API: string = config.get("FILES_API");

export async function getFiles(req: Request, res: Response){
    try {
        const resApi = await axios.get(FILES_API);
        const parsedResponse = resApi.data as FilesApiResponse;
        res.send(parsedResponse);        
    } catch (error) {
        res.status(400);
        res.send("Failed to get data from an API");
    }
}