import { FilesApiResponse } from "../../src/models/externalFilesApi/filesApiResponse";
import { NodeType, RadixNode } from "../../src/models/fileSystemResponse/radix";

export function radix(data: FilesApiResponse) {
    const root = new RadixNode('', NodeType.ROOT);
    for (let i = 0; i < data.files.length; i++) {
        const fileUrl = data.files[i].fileUrl;
        const url = new URL(fileUrl);
        const ipAddress = url.hostname;
        let urlParts = [ipAddress];
        urlParts = urlParts.concat(url.pathname.split('/').filter(pn => pn.length > 0))
        const nodeType = url.pathname.endsWith('/') ? NodeType.DIRECTORY : NodeType.FILE; 
        root.insert(urlParts, nodeType);
    }

    root.toJSON();
}