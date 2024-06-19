import axios from 'axios';
import config from 'config';
import { FilesApiResponse } from '../models/externalFilesApi/filesApiResponse';

const FILES_API: string = config.get("FILES_API");

export class ExternalFilesApiService{

    async getFiles(){
        try {
            const resApi = await axios.get(FILES_API);
            const parsedResponse = resApi.data as FilesApiResponse;
            return parsedResponse;
        } catch (error) {
            return null;
        }
    }
}