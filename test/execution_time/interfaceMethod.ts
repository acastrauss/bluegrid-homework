import { FilesApiResponse } from "../../src/models/externalFilesApi/filesApiResponse";
import { IDir, addToDir } from "../../src/models/fileSystemResponse/IDir";

export function interfaceMethod(data: FilesApiResponse) {
    const root = {} as IDir;
    root[''] = [];

    for (let i = 0; i < data!.files.length; i++) {
        const fileUrl = data!.files[i].fileUrl;
        const url = new URL(fileUrl);
        const ipAddress = url.hostname;

        const isDir = url.pathname.endsWith('/');
        addToDir(root, '', `${ipAddress}/${url.pathname}`, isDir);
    }
}