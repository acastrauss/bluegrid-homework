import { FilesApiResponse } from "../models/externalFilesApi/filesApiResponse";
import { Directory } from "../models/fileSystemResponse/fileSystemResponse";
import { Dir, DirContent, IDir, addToDir } from './../models/fileSystemResponse/response';

export class FilesDataParserService {

    async parseFilesApiResponse(response: FilesApiResponse) {
        const root = {name : ''} as Dir;
        root[''] = [];
        for (let i = 0; i < response.files.length; i++) {
            const fileUrl = response.files[i].fileUrl;
            const url = new URL(fileUrl);
            const ipAddress = url.hostname;

            const isDir = url.pathname.endsWith('/');
            addToDir(root, '', `${ipAddress}/${url.pathname}`, isDir);
        }

        return root;
    }
}