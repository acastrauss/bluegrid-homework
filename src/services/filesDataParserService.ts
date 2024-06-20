import { FilesApiResponse } from "../models/externalFilesApi/filesApiResponse";
import { NodeType, RadixNode } from "../models/fileSystemResponse/radix";

export class FilesDataParserService {

    async parseFilesApiResponse(response: FilesApiResponse) {
        const root = new RadixNode('', NodeType.ROOT);
        for (let i = 0; i < response.files.length; i++) {
            const fileUrl = response.files[i].fileUrl;
            const url = new URL(fileUrl);
            const ipAddress = url.hostname;
            let urlParts = [ipAddress];
            urlParts = urlParts.concat(url.pathname.split('/').filter(pn => pn.length > 0))
            const nodeType = url.pathname.endsWith('/') ? NodeType.DIRECTORY : NodeType.FILE; 
            root.insert(urlParts, nodeType);
        }

        return root.toJSON();
    }
}