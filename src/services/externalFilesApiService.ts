import axios from 'axios';
import config from 'config';
import { FilesApiResponse } from '../models/externalFilesApi/filesApiResponse';
import { File } from '../models/externalFilesApi/file';

const FILES_API: string = config.get("FILES_API");

export class ExternalFilesApiService {

    async getFiles() {
        try {
            const resApi = await axios.get(FILES_API);
            const parsedResponse = resApi.data['items'] as File[];
            return { files: parsedResponse } as FilesApiResponse;
        } catch (error) {
            return null;
        }
    }
}