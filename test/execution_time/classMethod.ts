import { FilesApiResponse } from "../../src/models/externalFilesApi/filesApiResponse";
import { Directory } from "../../src/models/fileSystemResponse/directory";

export function classMethod(data: FilesApiResponse) {
    const root = new Directory('');

    for (let i = 0; i < data!.files.length; i++) {
        const fileUrl = data!.files[i].fileUrl;
        const url = new URL(fileUrl);
        const ipAddress = url.hostname;

        const isDir = url.pathname.endsWith('/');

        root.addContent(`${ipAddress}/${url.pathname}`, isDir);
    }

    root.formatToJson();
}