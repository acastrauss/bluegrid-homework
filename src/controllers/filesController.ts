import axios from 'axios';
import config from 'config';
import { Request, Response } from 'express';

const FILES_API: string = config.get("FILES_API");

export async function getFiles(req: Request, res: Response){
    try {
        const resApi = await axios.get(FILES_API);
        res.send(resApi.data);
    } catch (error) {
        throw new Error("Failed to get data from an API");
    }
}