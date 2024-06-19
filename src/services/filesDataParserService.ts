import { FilesApiResponse } from "../models/externalFilesApi/filesApiResponse";
import { Directory } from "../models/fileSystemResponse/fileSystemResponse";
import { DirContent, IDir, addToDir } from './../models/fileSystemResponse/response';

export class FilesDataParserService {

    async parseFilesApiResponse(response: FilesApiResponse) {
        const root = new Directory('');
        for (let i = 0; i < response.files.length; i++) {
            const fileUrl = response.files[i].fileUrl;
            const url = new URL(fileUrl);
            const ipAddress = url.hostname;

            const isDir = url.pathname.endsWith('/');
            root.addContent(`${ipAddress}/${url.pathname}`, isDir);
        }

        return root.formatToJson();
    }
}